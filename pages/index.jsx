import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import css from "../styles/home.module.css";
import BalanceTag from "../components/BalanceTag";
import logo from "../public/comx.png";
// import Button from "../components/Button";
import SideBarIcons from "../components/SideBarIcons";
import Menu from "../components/Menu";
import "semantic-ui-css/semantic.min.css";
import Options from "../components/Options";
import { Button, Table } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { decryptResponse } from "../utils/encryption";
import { instance } from "./_app";
import Footer from "../components/Footer";
const inter = Inter({ subsets: ["latin"] });

const balances = [
  {
    title: "CASH BALANCE",
    amount: "N 8,374,763",
  },
  {
    title: "SECURITIES VALUE",
    amount: "N 8,374,763",
  },
  {
    title: "LOAN BALANCE",
    amount: "N 8,374,763",
  },
];

const sideBarMenus = [
  {
    icon: "fa-solid fa-gauge",
    title: "Overview",
  },
  {
    icon: "fa-solid fa-chart-line",
    title: "Market",
  },
  {
    icon: "fa-solid fa-briefcase",
    title: "Portfolio",
  },
  {
    icon: "fa-solid fa-users",
    title: "Community",
  },
  {
    icon: "fa-regular fa-file",
    title: "Reports",
  },
  {
    icon: "fa-solid fa-gear",
    title: "Settings",
  },
];

const NoContentAvailable = () => (
  <>
    <div>No content available, please reload the browser...</div>
  </>
);

export default function Home() {
  const [clientPositions, setClientPositions] = useState([]);
  const [orderBook, setOrderBook] = useState([]);
  const {
    sendJsonMessage: sendToClientPositions,
    getWebSocket: getWebSocketForClientPositions,
  } = useWebSocket(
    "wss://comx-sand-api.afexnigeria.com/stream/client-positions?cid=9900153747",
    {
      onOpen: (e) => {
        console.log("Connected to web socket successfully");
      },
      onMessage: (e) => {
        const data = JSON.parse(e?.data);
        console.log("Received message for client positions", data);
        console.log(
          "Decrypted data for client positions",
          decryptResponse(data)
        );
        setClientPositions(decryptResponse(data?.portfolio));
      },
      onClose: (e) => {
        console.log("Web socket closed", e);
      },
      shouldReconnect: (e) => true,
    }
  );

  const {
    sendJsonMessage: sendToOrderBook,
    getWebSocket: getWebSocketForOrderBook,
  } = useWebSocket("wss://comx-sand-api.afexnigeria.com/stream/trades", {
    onOpen: (e) => {
      console.log("Connected to web socket successfully");
    },
    onMessage: (e) => {
      const data = JSON.parse(e?.data);
      console.log("Received message for order book", data);
      console.log("Decrypted data for order book", decryptResponse(data));
      setOrderBook(decryptResponse(data?.messages));
    },
    onClose: (e) => {
      console.log("Web socket closed", e);
    },
    shouldReconnect: (e) => true,
  });

  const getClientPositions = async () => {
    const url = `https://comx-sand-api.afexnigeria.com/api/securities/boards`;
    const response = await instance
      .get(url)
      .catch((e) => console.log("Error", e));

    if (response) {
      setClientPositions(response.data);
      console.log("Client positions", response.data);
    }
  };

  useEffect(() => {
    getClientPositions();
    sendToClientPositions({ message: "Hi, i sent a message" });
    console.log("I sent a message");
  }, []);

  const getTable3Heads = () => {
    const heads = [];
    for (const key /**@type String */ in orderBook[0]) {
      if (
        typeof orderBook[0][key] === "object" ||
        Array.isArray(orderBook[0][key])
      ) {
        continue;
      }
      heads.push(key?.toUpperCase());
    }
    return heads;
  };

  const getTable3Cells = (item) => {
    const cells = [];
    for (const key in item) {
      if (typeof item[key] === "object" || Array.isArray(item[key])) {
        continue;
      }
      cells.push(item[key]);
    }
    return cells;
  };

  return (
    <>
      <Head>
        <title>Afex Nigeria project</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <main className={css.main}>
        <div className={css.grid}>
          <div className={css.header}>
            <div className={css.logo}>
              <div className={css["img-container"]}>
                <img src={logo.src} alt="Logo" />
              </div>
              <div className={css.toogle}>Toogle</div>
            </div>
            <div className={css.prices}>
              {balances.map((eachItem) => (
                <BalanceTag item={eachItem} />
              ))}
            </div>
            <div className={css.action}>
              <Button secondary>Demo</Button> ^
            </div>
          </div>
          <div className={css.sidebar}>
            {sideBarMenus.map((eachMenu) => (
              <SideBarIcons icon={eachMenu.icon} title={eachMenu.title} />
            ))}
          </div>
          <div className={css.content}>
            <div className={css.menus}>
              <Menu />
            </div>
            <div className={css.tables}>
              <div className={css["options"]}>
                <div className={css["options-1"]}>
                  <Options
                    title="Board"
                    menus={["X-Traded", "OTC", "FI", "Derivatives"]}
                  />
                </div>
                <div className={css["options-2"]}>
                  <Options
                    title="Product"
                    menus={[
                      "All",
                      "SMAZ",
                      "SBSS",
                      "SPRL",
                      "SGNG",
                      "FETC",
                      "SCOC",
                    ]}
                  />
                </div>
              </div>
              <div className={css["table-1"]}>
                <Table striped className={css.table}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Product</Table.HeaderCell>
                      <Table.HeaderCell>Quantity</Table.HeaderCell>
                      <Table.HeaderCell>Bid Price</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {clientPositions.length > 0 ? (
                      clientPositions.map((eachclient) => (
                        <Table.Row>
                          <Table.Cell>{eachclient?.commodity_name}</Table.Cell>
                          <Table.Cell>{eachclient?.available_units}</Table.Cell>
                          <Table.Cell>
                            <em style={{ color: "green" }}>{eachclient?.pk}</em>
                          </Table.Cell>
                          <Table.Cell>
                            <Button basic color="green">
                              Buy
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ))
                    ) : (
                      <NoContentAvailable />
                    )}
                  </Table.Body>
                </Table>
              </div>
              <div className={css["table-2"]}>
                <Table striped className={css.table}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Product</Table.HeaderCell>
                      <Table.HeaderCell>Quantity</Table.HeaderCell>
                      <Table.HeaderCell>Offer Price</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {clientPositions.length > 0 ? (
                      clientPositions.map((eachclient) => (
                        <Table.Row>
                          <Table.Cell>{eachclient?.commodity_name}</Table.Cell>
                          <Table.Cell>{eachclient?.available_units}</Table.Cell>
                          <Table.Cell>
                            <em style={{ color: "red" }}>{eachclient?.pk}</em>
                          </Table.Cell>
                          <Table.Cell>
                            <Button basic color="red">
                              Sell
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ))
                    ) : (
                      <NoContentAvailable />
                    )}
                  </Table.Body>
                </Table>
              </div>
              <div className={css["table-3"]}>
                <Table striped className={css.table}>
                  <Table.Header>
                    <Table.Row>
                      {orderBook.length > 0 &&
                        getTable3Heads().map((eachHead) => {
                          if (
                            typeof eachHead === "object" ||
                            Array.isArray(eachHead)
                          ) {
                            return null;
                          }

                          return (
                            <Table.Cell>
                              <b>{eachHead}</b>
                            </Table.Cell>
                          );
                        })}
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {orderBook.length > 0 ? (
                      orderBook.map((eachItem) => (
                        <Table.Row>
                          {getTable3Cells(eachItem).map((eachCell) => (
                            <Table.Cell>{eachCell}</Table.Cell>
                          ))}
                        </Table.Row>
                      ))
                    ) : (
                      <NoContentAvailable />
                    )}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
          <div className={css.footer}>
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
