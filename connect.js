async function checkWallet() {
  try {
    if (window.ethereum !== undefined) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      document.getElementById("connect_txt_really").innerHTML =
        accounts[0].substring(0, 3) +
        "..." +
        accounts[0].substring(accounts[0].length - 3);
      document.getElementById("connect_txt").innerHTML =
        accounts[0].substring(0, 3) +
        "..." +
        accounts[0].substring(accounts[0].length - 3);
    }
  } catch (error) {}
}
async function onChangeId() {
  const x = document.getElementById("punkid");
  if (x.value) {
    if (x.value > 10) {
      extent = ".png";
    } else {
      extent = ".gif";
    }
    const str =
      "https://minenations.mypinata.cloud/ipfs/bafybeihhe5k3own4ugmrx2zcqak7zsugggvwctmhgdbyfxx3hhymwej6yi/" +
      x.value +
      extent;
    document.getElementById("punk_view").src = str;
  } else {
    const str =
      "https://i.seadn.io/gcs/files/40e35ab4a4e7c654151bdbb8cd19b2f7.png?auto=format&w=256";

    document.getElementById("punk_view").src = str;
  }
}
async function onSecure() {
  const x = document.getElementById("punkid");
  if (!x.value) {
    alert("ENETER YOUR PUNK ID");
  } else {
    window.location = "./new.html?punkid=" + x.value;
  }
}
async function getparam() {
  const queryString = window.location.search.split("?")[1];
  const id = queryString.split("=")[1];
  let extent = "";

  if (id > 10) {
    extent = ".png";
  } else {
    extent = ".gif";
  }
  const str =
    "https://minenations.mypinata.cloud/ipfs/bafybeihhe5k3own4ugmrx2zcqak7zsugggvwctmhgdbyfxx3hhymwej6yi/" +
    id +
    extent;

  document.getElementById("token_punk_id").innerHTML = id;
  document.getElementById("token_punk_img").src = str;
}
async function toPay() {
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const address1 = document.getElementById("address1").value;
  const address2 = document.getElementById("address2").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const zipcode = document.getElementById("zipcode").value;
  const country = document.getElementById("country").value;
  const queryString = window.location.search.split("?")[1];
  const id = queryString.split("=")[1];
  if (
    first_name &&
    last_name &&
    email &&
    address1 &&
    city &&
    state &&
    zipcode &&
    country
  ) {
    const address = "0xf6dbaa97811558215962d9714c20c8dd236d75f3";
    let price;
    fetch(
      "https://coinbase.com/api/v2/assets/search?base=USD&filter=listed&include_prices=true&resolution=day&sort=rank"
    )
      .then((res) => res.json())
      .then(async (result) => {
        const ethprice = result.data.filter((item) => item.base === "ETH");
        price = (150 / ethprice[0].latest).toFixed(2);

        const data = {
          first_name,
          last_name,
          email,
          address1,
          address2,
          city,
          state,
          zipcode,
          country,
          id,
        };

        try {
          if (window.ethereum !== undefined) {
            if (Number(window.ethereum.chainId) !== 1) {
              alert("Please connect to Mainnet");
            } else {
              const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
              data.payment = accounts[0];
              const web3 = new Web3(window.ethereum);

              await web3.eth.sendTransaction({
                from: accounts[0],
                to: address,
                value: web3.utils.toWei(price, "ether"),
              });
              await fetch(`https://bigapple-backend.vercel.app/mint/mail`, {
                method: "POST",
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(data),
              })
                .then((response) => response.json())
                .then((json) => alert("Thank you for your order"));
            }
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => console.log(error));
  } else {
    alert("Enter details correctly.");
  }
}
async function saved() {
  const puck_desk = document.getElementById("puck_desk").value;
  if (puck_desk) {
    document.getElementById("personal").innerHTML = "&#x2713; Saved";
  } else {
    alert("Enter Content");
  }
}
async function onReadmore() {
  document.getElementById(
    "silver_desc_text"
  ).innerHTML = `<div>IIt's time to get unchained with your very own custom Unordinal Silver Pendant.</div> <br/>
      <div>Each pendant is crafted with high-quality sterling silver and expertly designed to capture the unconventional and striking appeal of the Unordinal artwork. Our pendants are fully customizable, allowing you to select your token id and add your very own inscription on the back. </div><br/>
      <div style="margin-top:10px;">All our pendants come with a free 21 inch sterling silver chain and free tracked international shipping.</div>
      <br/><div>Whether you're a collector of unusual and rare pieces or just exploring new horizons, our Unordinal Pendants are sure to grab attention and initiate conversations. Their modern and sleek design makes them perfect for wearing with any outfit, making them ideal statement pieces for both casual and formal occasions. Plus, because we use only the highest quality materials, you can be confident that your pendant will last for many years to come.</div>
      <br/><div>Join the community of Unordinal enthusiasts and make a statement with our custom silver pendants. Order now and show off your unique style and love for extraordinary designs!</div>`;
}
