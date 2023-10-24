import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import QRCode from "qrcode";

export default function QRCodeGenerator() {
  const [url, setUrl] = useState(null);
  const [dataUrl, setDataUrl] = useState(null);

  // FOR SCANNER
  const [scannedData, setScannedData] = useState(null);
  const [scannedQR, setScannedQRURL] = useState(null);

  // FOR GENERATER
  const handleQRCodeGeneration = (e) => {
    e.preventDefault();
    QRCode.toDataURL(url, { width: 300 }, (err, dataUrl) => {
      if (err) console.error(err);

      // set dataUrl state to dataUrl
      console.log("Data Url", dataUrl);
      setDataUrl(dataUrl);
    });
  };

  // FOR SCANNER

  const handleScan = (scannedQRURL) => {
    QRCode.toDataURL(scannedQRURL, { width: 300 }, (err, dataUrl) => {
      if (err) console.error(err);

      // set dataUrl state to dataUrl
      console.log("Scanned Data Url", dataUrl);
      setScannedQRURL(dataUrl);
    });
  };

  let handleError = (err) => {
    alert(err);
    console.log(err);
  };

  // Token States
  const [tokenF, setTokenF] = useState(null);

  // GET TOKEN
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("Token"));
    console.log(token);
    setTokenF(token);
  }, []);

  const saveQrCode = (data) => {
    let dataObject = JSON.stringify({
      DataImageURL: data,
    });

    console.log(dataObject);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/saveqrcode",
      headers: { token: tokenF, "Content-Type": "application/json" },
      data: dataObject,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert(JSON.stringify(response.data));
        setScannedQRURL(null);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div className="outerContainer min-h-screen min-w-screen flex justify-center flex-wrap items-center bg-gray-700">
      <div className="innerContainer w-full md:mx-auto my-32 mx-10  max-w-md p-9 bg-white rounded-lg shadow-lg">
        <div className="app">
          <h1 className="text-xl text-center font-bold">QR Code Generator</h1>

          <form
            className="border-2 flex flex-col gap-5 p-10"
            onSubmit={handleQRCodeGeneration}
          >
            <input
              type="text"
              id="url"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter a valid URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Generate
            </button>
          </form>
        </div>
        <div>
          {
            /* code to conditionally display the QR code and a download button
        would go here */
            dataUrl && (
              <div className="innerContainer w-full mx-auto max-w-md p-9 bg-white rounded-lg shadow-lg">
                <img src={dataUrl} alt="qr code" />
                <div className="ButtonContainer flex justify-center gap-5">
                  <a
                    href={dataUrl}
                    download
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Download
                  </a>
                  <button
                    onClick={saveQrCode}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            )
          }
        </div>
      </div>

      {/* SCANNER */}
      <div className="innerContainer w-full md:mx-auto my-32 mx-10  max-w-md p-9 bg-white rounded-lg shadow-lg">
        <div className="app">
          <h1 className="text-xl text-center font-bold">QR Code Scanner</h1>
          <QrReader
            delay={2000}
            onError={handleError}
            //onScan={handleScan}
            style={{ width: "100%" }}
            facingMode="user"
            onResult={(result) => {
              if (result) {
                setScannedData(result.text);
                console.log(result);
                handleScan(result.text);
              }
              return;
            }}
          />
        </div>
        <div>
          {
            /* code to conditionally display the QR code and a download button
        would go here */
            scannedQR && (
              <div className="innerContainer w-full mx-auto max-w-md p-9 bg-white rounded-lg shadow-lg">
                <img src={scannedQR} alt="qr code" />
                <div className="ButtonContainer flex justify-center gap-5">
                  <a
                    href={scannedQR}
                    download
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => saveQrCode(scannedQR)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
