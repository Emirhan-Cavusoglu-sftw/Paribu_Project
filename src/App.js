import useConnection from "./hooks/useConnection";

// import { cinecontract } from "./config";
import { useState } from "react";
import { ethers } from "ethers";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import marketPlacejson from "./metadata/marketPlace.json";
// import contractAddress from "./utils/config";

// const getEthereumObject = () => window.ethereum;
function App() {
  const firstCardBody = document.querySelectorAll(".dataContainer")[0];

  function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);
    setTimeout(function () {
      alert.remove();
    }, 4000);
  }

  const connection = useConnection();
  const { ethereum } = window;
  const connect = async () => {
    connection.connect();
  };

  const [ticketAmount, setTicketAmount] = useState(0);
  // const contract = useContract("0xF786f7960547373C0AD36f055ce4397Fa36D8847", marketPlacejson.abi);
  var ticketPrice = ticketAmount * ethers.utils.parseEther("0.00001");
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const ticketToken = new ethers.Contract(
    "0x1299903d8aD46fd7A64036e2e76438E758d304d5",
    marketPlacejson.abi,
    signer
  );
  
  const idToTicketAmount0=async()=>{
    showAlert("success",await ticketToken.ticketAmount(0))
  }
  const idToTicketAmount1=async()=>{
    showAlert("success",await ticketToken.ticketAmount(1))
  }
  const idToTicketAmount2=async()=>{
    showAlert("success",await ticketToken.ticketAmount(2))
  }
  
  
  
  
  
  
  const buyTicket0 = async () => {
    try {
      await ticketToken.buyTicket(0, ticketAmount, { value: ticketPrice });
    } catch (error) {
      showAlert("danger", error.reason.replace("execution reverted","Error"));
    }

    // await contract.buyTicket(0, ticketAmount,{value:ticketAmount*ethers.utils.parseEther("0.1")});
  };
  const buyTicket1 = async () => {
    
    try {
      await ticketToken.buyTicket(1, ticketAmount, { value: ticketPrice });
    } catch (error) {
      showAlert("danger", error.reason.replace("execution reverted","Error"));
    }

  };
  const buyTicket2 = async () => {
    
    try {
      await ticketToken.buyTicket(2, ticketAmount, { value: ticketPrice });
    } catch (error) {
      showAlert("danger", error.reason.replace("execution reverted","Error"));
    }
  };

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="logo">
          <text className="Logo">CineTicketToken</text>
        </div>
        <div className="description">
          <text className="Description">
            CineTicketToken sinema biletlerini erc1155 tokenlarını sinemaların
            id lerine göre ayırarak size mint işlemiyle token biletlerinizi
            veren bir küçük dapptir
          </text>
        </div>

        <div className="buton">
          <button onClick={connect} className="Buton">
            Connect Your Wallet
          </button>
        </div>
        <text className="text">Bilet sayısını giriniz</text>
        <input
          type={"number"}
          onChange={(e) => setTicketAmount(e.target.value)}
          className="ticketAmount"
        ></input>
      </div>
      <div class="container">
        <div class="card">
          <div class="box">
            <div class="content">
              <p></p>
              <button onClick={buyTicket0} className="ticketButton">
                Bilet Al
              </button>
              <div >
                <button onClick={idToTicketAmount0} className="ticketAmountButton"> Kalan Bilet Sayısı</button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="boxx">
            <div class="content">
              <button onClick={buyTicket1} className="ticketButton">
                Bilet Al
              </button>
              <div >
                <button onClick={idToTicketAmount1} className="ticketAmountButton"> Kalan Bilet Sayısı</button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="boxxx">
            <div class="content">
              <button onClick={buyTicket2} className="ticketButton">
                Bilet Al
              </button>
              <div >
                <button onClick={idToTicketAmount2} className="ticketAmountButton"> Kalan Bilet Sayısı</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
