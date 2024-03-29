import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useAccount } from "wagmi";
import { SubtitleRegular14, TitleH3 } from "../../components/basic";
import { PortfolioSummary } from "../../components/portfolio/Summary";
import { PortfolioPositions } from "../../components/portfolio/Positions";
import { PortfolioTransactions } from "../../components/portfolio/Transactions";
import { SuperHedgeTabs } from "../../components/commons/Tabs";
import { PortfolioListings } from "../../components/portfolio/Listings";

const Portfolio = () => {
  const { address } = useAccount();

  const [tab, setTab] = useState(0);
  const [historyOrder, setHistoryOrder] = useState(0);
  const [enabled, setEnabled] = useState(false);

  return (
    <div className={"py-12 flex justify-center"}>
      <div className={`${tab === 0 ? "max-w-[650px]" : ""} w-full`}>
        <div className={"flex flex-col items-center w-full"}>
          <SuperHedgeTabs labels={["OVERVIEW", "MY LISTING"]} tab={tab} className={"w-[180px]"} setTab={(tab) => setTab(tab)} />

          {tab === 0 && (
            <div className={"flex flex-col w-full space-y-[80px] mt-12"}>
              <div className={"flex flex-col space-y-[20px]"}>
                <TitleH3>Portfolio summary</TitleH3>
                <PortfolioSummary />
              </div>

              <div className={"flex flex-col space-y-[20px]"}>
                <div className={"flex items-center justify-between"}>
                  <TitleH3>Positions</TitleH3>
                  {address && (
                    <div className={"flex items-center space-x-3"}>
                      <SubtitleRegular14>SHOW NFT ARTWORK</SubtitleRegular14>
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className={`${enabled ? "bg-[#292929]" : "bg-gray-200"} relative inline-flex h-6 w-11 items-center rounded-full`}
                      >
                        <span className='sr-only'>Show NFT ARTWORK</span>
                        <span
                          className={`${
                            enabled ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                      </Switch>
                    </div>
                  )}
                </div>
                <PortfolioPositions enabled={enabled} />
              </div>

              <div className={"flex flex-col space-y-[20px]"}>
                <div className={"flex items-center justify-between"}>
                  <TitleH3>Transaction History</TitleH3>
                  {address && (
                    <SuperHedgeTabs
                      labels={["Latest", "Newest"]}
                      tab={historyOrder}
                      className={"w-full"}
                      setTab={(tab) => setHistoryOrder(tab)}
                    />
                  )}
                </div>
                <PortfolioTransactions order={historyOrder} />
              </div>
            </div>
          )}

          {tab === 1 && (
            <div className={"flex flex-col sm:items-center mt-12"}>
              <PortfolioListings />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
