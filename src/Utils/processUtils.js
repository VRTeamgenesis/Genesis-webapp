import CryptoJS from "crypto-js";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import { Web3Storage } from 'web3.storage'
import { WEB3_TOKEN, FILE_ENCRYPTKEY } from "./CONSTANTS";

const client = new Web3Storage({ token: WEB3_TOKEN });

const fetchWeb3StorageClient = () => {
        return Promise.resolve(client)
}

 function UploadImages(selectedFiles) {
    for (let loop = 0; loop < selectedFiles.length; loop++) {
        var reader = new FileReader();
        reader.readAsDataURL(selectedFiles[loop]);
        reader.onload = function (e) {
            const encryptedText = CryptoJS.AES.encrypt(e.target.result, FILE_ENCRYPTKEY).toString();
            const url = URL.createObjectURL(selectedFiles[loop])
            const img = new Image();
            img.onload =  function () {
                mobilenet.load().then((model)=>{
                model.classify(img).then((pred)=>{
                    console.log(loop);
                var encryptedTextBlob = new Blob([encryptedText], {
                    type: 'text/plain'
                });
                var file = new File([encryptedTextBlob], 'name');
                client.put([file], {
                    name: selectedFiles[loop].name,
                    maxRetries: 3,
                }).then((cid) => {
                    console.log(cid);
                });
            })
            })

            }
            img.src = url;
        }
    };
}
export { UploadImages, fetchWeb3StorageClient }