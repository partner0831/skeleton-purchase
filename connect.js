async function checkWallet() {
  try {
    if (window.ethereum !== undefined) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts, accounts[0].length);
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
      id +
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
  ).innerHTML = `<div>Introducing our custom Crypto Punk silver pendants - the perfect addition
      to any cryptocurrency enthusiast's jewelry collection!</div> <br/><div>Each pendant is
      made with high-quality sterling silver and expertly crafted to capture the
      unique and iconic design of the Crypto Punk artwork. 
      <br/><div style="margin-top:10px;">Our pendants can be customized to your specifications, allowing you to choose your favorite
      Crypto Punk character or design, as well as any additional details you'd
      like to include.</div>
      <br/><div>Whether you're a long-time collector or just discovering
      the world of cryptocurrency, these pendants are sure to turn heads and
      spark conversations. With their sleek and modern design, our custom Crypto
      Punk silver pendants are versatile enough to wear with any outfit, making
      them the perfect statement piece for both casual and formal occasions. And
      because they're made with high-quality materials, you can be sure that
      your pendant will last for years to come.</div>
      <br/><div>Order now and join the growing
      community of Crypto Punk collectors and enthusiasts, and show off your
      love for all things cryptocurrency with our custom silver pendants.</div>`;
}
