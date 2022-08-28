import CryptoJS from "crypto-js";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import { Web3Storage } from 'web3.storage'
import { WEB3_TOKEN, FILE_ENCRYPTKEY } from "./CONSTANTS";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { firebaseAuth } from "./loginUtils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { publish } from "./events";


function writeUserData(email, cIdArrayList) {
    const db = getDatabase();
    set(ref(db, 'users/' + email), {
        list: cIdArrayList
    });
}
function writeCIdInfo(email,cid, pred){
    const db = getDatabase();
    // set(ref(db, 'users/' + email +"cIds").push({
    //     cid: cid,
    //     pred:pred
    // }));
}
const client = new Web3Storage({ token: WEB3_TOKEN });
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const fetchWeb3StorageClient = () => {
    return Promise.resolve(client)
}
async function initFiles(cIdList) {
    const promisesList = [];
    console.log(cIdList);

    for (let loop = 0; loop < cIdList.length; loop++) {
        try {
            promisesList.push(new Promise((resolve) => {
                client.get(cIdList[loop]).then((res) => {
                    res.files().then((files) => {
                        const blob = new Blob([files[0]], { type: 'text/plain' });

                        var reader = new FileReader();
                        reader.onload = function () {
                            // console.log( CryptoJS.AES.decrypt(this.result, FILE_ENCRYPTKEY).toString(CryptoJS.enc.Utf8))
                            // resolve({ img: CryptoJS.AES.decrypt(this.result, FILE_ENCRYPTKEY).toString(CryptoJS.enc.Utf8) });
                            publish("initalImages", { img: CryptoJS.AES.decrypt(this.result, FILE_ENCRYPTKEY).toString(CryptoJS.enc.Utf8), pos: loop })
                        }
                        reader.readAsText(blob);
                    })
                })

            })

            )
        } catch (e) {
            console.log(e)
        }

    }

    // Promise.all(promisesList).then((list) => {
    //   console.log(list)
    //   publish("initalImages", list)
    // })
}


function UploadImages(selectedFiles) {
    if (selectedFiles.length > 0) {
        publish("showToast", { msg: "Uploading Images" });
    }
    for (let loop = 0; loop < selectedFiles.length; loop++) {

        var reader = new FileReader();
        reader.readAsDataURL(selectedFiles[loop]);
        reader.onload = function (e) {
            const encryptedText = CryptoJS.AES.encrypt(e.target.result, FILE_ENCRYPTKEY).toString();
            const url = URL.createObjectURL(selectedFiles[loop])
            const img = new Image();
            img.onload = function () {
                mobilenet.load().then((model) => {
                    model.classify(img).then((pred) => {
                       
                        var encryptedTextBlob = new Blob([encryptedText], {
                            type: 'text/plain'
                        });
                        var file = new File([encryptedTextBlob], 'name');
                        client.put([file], {
                            name: selectedFiles[loop].name,
                            maxRetries: 3,
                        }).then((cid) => {
                            console.log(cid);
                            const dbRef = ref(getDatabase());

                            if (firebaseAuth.currentUser) {
                                let email = firebaseAuth.currentUser.email;
                                email = email.split(".").join("");
                                get(child(dbRef, `users/${email}`)).then((snapshot) => {
                                    if (snapshot.exists()) {
                                        writeUserData(email, [cid, ...snapshot.val().list])
                                        initFiles([cid])
                                    } else {
                                        writeUserData(email, [cid])
                                        initFiles([cid])
                                    }
                                    writeCIdInfo(email,cid,pred)
                                }).catch((error) => {
                                    console.error(error);
                                });
                            }
                        });
                    })
                })

            }
            img.src = url;
        }
    };
}
function fetchInitialList() {
    const dbRef = ref(getDatabase());
    const auth = getAuth();

    const user = auth.currentUser;
    console.log(user);
    onAuthStateChanged(auth, (user) => {

        if (user) {

            let email = user.email;

            email = email.split(".").join("");

            get(child(dbRef, `users/${email}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    publish("showToast", { msg: "Decrypting Images" });
                    initFiles(snapshot.val().list);
                    
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }

    })
}

fetchInitialList();

export { UploadImages, fetchWeb3StorageClient, getCookie, initFiles }