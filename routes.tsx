import { createMemoryRouter, Navigate } from "react-router-dom";
import App from "./App";
import WalletSetup from "./pages/WalletSetup";
import CreatePin from "./pages/CreatePin";
import CreateSeedPhrase from "./pages/CreateSeedPhrase";
import Home from "./pages/Home";
import { WalletManager } from "./lib/WalletManager";
import ConnectRequest from "./pages/ConnectRequest";
import SuccessPin from "./pages/SuccessPin";
import SeedPhrase from "./pages/SeedPhrase";
import Secure from "./pages/Secure";
import SecureStep from "./pages/SecureStep";
import SuccessSecure from "./pages/SuccessSecure";
import RemindSecure from "./pages/RemindSecure";
import ImportSeed from "./pages/ImportSeed";
import ImportWallet from "./pages/ImportWallet";
import SuccessImport from "./pages/SuccessImport";
import ImportKey from "./pages/ImportKey";
import TokenDetail from "./pages/TokenDetail";
import Collectibles from "./pages/Collectibles";
import ManageCollectibleList from "./pages/ManageCollectibleList";
import NFTDetail from "./pages/NFTDetail";
import Support from "./pages/Support";
import Faq from "./pages/Faq";
import Tutorials from "./pages/Tutorials";
import Explore from "./pages/Explore";
import ExploreSearch from "./components/explore/ExploreSearch";
import Info from "./pages/Info";
import AmlPolicy from "./pages/AmlPolicy";
import WhitePaper from "./pages/WhitePaper";
import TermsConditions from "./pages/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Portfolio from "./pages/Portfolio";
import Legal from "./pages/Legal";
import WatchAddress from "./pages/WatchAddress";
import SuccessImportPrivatekeyDomain from "./pages/SuccessImportPrivatekeyDomain";
import InputSendAddress from "./pages/InputSendAddress";
import SendAmount from "./pages/SendAmount";
import ReadySend from "./pages/ReadySend";
import GeneralSetting from "./pages/GeneralSetting";
import AddressBook from "./pages/AddressBook";
import AddAddress from "./pages/AddAddress";
import EditAddress from "./pages/EditAddress";
import DisplayLanguage from "./pages/DisplayLanguage";
import ConnectedApp from "./pages/ConnectedApp";
import PrefferedExplorer from "./pages/PrefferedExplorer";
import AppPage from "./pages/AppPage";
import SwapPage from "./pages/SwapPage";
import SwapConfirmation from "./pages/SwapConfirmation";
import ValidatorPage from "./pages/ValidatorPage";
import StakePage from "./pages/StakePage";
import YourStake from "./pages/YourStake";
import StakeWithdrawalConfirming from "./pages/StakeWithdrawalConfirming";
import CreateStake from "./pages/CreateStake";
import StakeConfirmation from "./pages/StakeConfirmation";
import SendSuccess from "./pages/SendSuccess";
import Receive from "./pages/Receive";
import SelectToken from "./pages/SelectToken";
import BuyDetail from "./pages/BuyDetail";
import CreateNewPin from "./pages/CreateNewPin";
import ImportSeedForgotPin from "./pages/ImportSeedForgotPin";
import WelcomeBack from "./pages/WelcomeBack";
import RecieveNft from "./pages/Portfolio/components/HistoryDetail/RecieveNft";
import BuyHistory from "./pages/Portfolio/components/HistoryDetail/BuyHistory";
import SendHistory from "./pages/Portfolio/components/HistoryDetail/SendHistory";
import SwapHitory from "./pages/Portfolio/components/HistoryDetail/SwapHitory";
import StakeHistory from "./pages/Portfolio/components/HistoryDetail/StakeHistory";
import RecieveHistory from "./pages/Portfolio/components/HistoryDetail/RecieveHistory";
import ThirdParty from "./pages/ThirdParty";
import WalletDetails from "./pages/WalletDetails";
import EditWalletName from "./pages/EditWalletName";
import ShowSeed from "./pages/ShowSeed";
import ShowSeedPhrase from "./pages/ShowSeedPhrase";
import EditAccount from "./pages/EditAccount";
import EditAccountName from "./pages/EditAccountName";
import EditAccountAvatar from "./pages/EditAccountAvatar";
import ShowAddress from "./pages/ShowAddress";
import ShowPrivateKey from "./pages/ShowPrvKey";
import YourPrvKey from "./pages/YourPrvKey";
import Connecting from "./pages/Connecting";
import Security from "./pages/Security";
import ConfirmPIN from "./pages/ConformPIN";
import NewPIN from "./pages/NewPIN";
import ResetApp from "./pages/ResetApp";
import ReadySendNFT from "./pages/ReadySendNFT";
import CreateAccount from "./pages/CreateAccount";
import Wallets from "@/components/Wallets";

const checkWalletState = async () => {
  try {
    const hasPin = await WalletManager.hasPin();
    console.log("HAS PIN", hasPin);
    if (!hasPin) {
      return "/create";
    }
    const hasSeedPhrase = await WalletManager.hasSeedPhrase();
    console.log("HAS SEED PHRASE", hasSeedPhrase);
    if (!hasSeedPhrase) {
      return "/create/seedphrase";
    }
    return "/home";
  } catch (error) {
    console.error("Error checking wallet state:", error);
    return "/create";
  }
};

const initialCheck = async () => {
  const hasPin = await WalletManager.hasPin();
  if (hasPin) {
    return "/welcome-back";
  }
  return "/create";
};

const checkPinState = async () => {
  try {
    const hasPin = await WalletManager.hasPin();
    if (hasPin) {
      return "/home";
    }
    return null;
  } catch (error) {
    console.error("Error checking PIN state:", error);
    return "/create";
  }
};

export const router = createMemoryRouter(
  [
    {
      path: "/",
      element: <App />,
      loader: async () => {
        const initialRoute = await initialCheck();
        console.log("Rerouting to initial", initialRoute);
        return { initialRoute };
      },

      children: [
        {
          path: "create/seedphrase",
          element: <CreateSeedPhrase />,
          loader: async () => {
            const hasPin = await WalletManager.hasPin();
            const hasSeedPhrase = await WalletManager.hasSeedPhrase();
            if (!hasPin) {
              return { redirect: "/create/pin" };
            }
            if (hasSeedPhrase) {
              return { redirect: "/home" };
            }
            return null;
          },
        },
        {
          path: "home",
          element: <Home />,
          loader: async () => {
            const route = await checkWalletState();
            if (route !== "/home") {
              return { redirect: route };
            }
            return null;
          },
        },
        {
          path: "create/pin",
          element: <CreatePin />,
          loader: async () => {
            const hasPin = await WalletManager.hasPin();
            if (hasPin) {
              const hasSeedPhrase = await WalletManager.hasSeedPhrase();
              return {
                redirect: hasSeedPhrase ? "/home" : "/create/seedphrase",
              };
            }
            return null;
          },
        },
        {
          path: "create/seedphrase",
          element: <CreateSeedPhrase />,
          loader: async () => {
            const hasPin = await WalletManager.hasPin();
            const hasSeedPhrase = await WalletManager.hasSeedPhrase();
            if (!hasPin) {
              return { redirect: "/create/pin" };
            }
            if (hasSeedPhrase) {
              return { redirect: "/home" };
            }
            return null;
          },
        },

        {
          path: "create/new/pin",
          element: <CreateNewPin />,
          loader: async () => {
            const redirectTo = await checkPinState();
            if (redirectTo) {
              return { redirect: redirectTo };
            }
            return null;
          },
        },

        {
          path: "connect-request",
          element: <ConnectRequest />,
        },
        {
          path: "secure",
          element: <SeedPhrase />,
        },
        {
          index: true,
          element: <Navigate to="/create" replace />,
        },
        {
          path: "secure/wallet",
          element: <Secure />,
        },
        {
          path: "secure/wallet/step",
          element: <SecureStep />,
        },
        {
          path: "secure/wallet/success",
          element: <SuccessSecure />,
        },
        {
          path: "secure/wallet/remind",
          element: <RemindSecure />,
        },
        {
          path: "import/seed",
          element: <ImportSeed />,
        },
        {
          path: "import/seed/forgot/pin",
          element: <ImportSeedForgotPin />,
        },
        {
          path: "import/wallet",
          element: <ImportWallet />,
        },
        {
          path: "import/success",
          element: <SuccessImport />,
        },
        {
          path: "import/key",
          element: <ImportKey />,
        },
        {
          path: "token/detail",
          element: <TokenDetail />,
        },
        {
          path: "collectibles",
          element: <Collectibles />,
        },
        {
          path: "manage-collectibles",
          element: <ManageCollectibleList />,
        },
        {
          path: "help-support",
          element: <Support />,
        },
        {
          path: "nft-detail",
          element: <NFTDetail />,
        },
        {
          path: "secure",
          element: <SeedPhrase />,
        },
        {
          path: "create/account",
          element: <CreateAccount />,
        },
        {
          path: "info",
          element: <Info />,
        },
        {
          path: "aml-policy",
          element: <AmlPolicy />,
        },
        {
          path: "whitepaper",
          element: <WhitePaper />,
        },
        {
          path: "terms-conditions",
          element: <TermsConditions />,
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "legal",
          element: <Legal />,
        },
        {
          path: "portfolio",
          element: <Portfolio />,
        },
        {
          path: "watch-address",
          element: <WatchAddress />,
        },
        {
          path: "import/success-import-privatekey-domain",
          element: <SuccessImportPrivatekeyDomain />,
        },
        {
          path: "select-token",
          element: <SelectToken />,
        },
        {
          path: "send/input-address",
          element: <InputSendAddress />,
        },
        {
          path: "send/amount",
          element: <SendAmount />,
        },
        {
          path: "send/ready",
          element: <ReadySend />,
        },
        {
          path: "/settings",
          element: <GeneralSetting />,
        },
        {
          path: "/address-book",
          element: <AddressBook />,
        },
        {
          path: "/add-address",
          element: <AddAddress />,
        },
        {
          path: "/edit-address",
          element: <EditAddress />,
        },
        {
          path: "display-language",
          element: <DisplayLanguage />,
        },
        {
          path: "connected-app",
          element: <ConnectedApp />,
        },
        {
          path: "preffered-explorer",
          element: <PrefferedExplorer />,
        },
        {
          path: "app-page",
          element: <AppPage />,
        },
        {
          path: "send/success",
          element: <SendSuccess />,
        },
        {
          path: "receive",
          element: <Receive />,
        },
        {
          path: "create",
          element: <WalletSetup />,
        },
        {
          path: "created",
          element: <SuccessPin />,
        },
        {
          path: "connect-request",
          element: <ConnectRequest />,
        },
        {
          path: "faq",
          element: <Faq />,
        },
        {
          path: "tutorials-guide",
          element: <Tutorials />,
        },
        {
          path: "explore",
          element: <Explore />,
        },
        {
          path: "explore/search",
          element: <ExploreSearch />,
        },
        {
          path: "swap",
          element: <SwapPage />,
        },
        {
          path: "swap/confirmation",
          element: <SwapConfirmation />,
        },
        {
          path: "validator",
          element: <ValidatorPage />,
        },
        {
          path: "stake",
          element: <StakePage />,
        },
        {
          path: "stake/add",
          element: <YourStake />,
        },
        {
          path: "stake/withdrawal/confirming",
          element: <StakeWithdrawalConfirming />,
        },
        {
          path: "stake/create",
          element: <CreateStake />,
        },
        {
          path: "stake/confirmation",
          element: <StakeConfirmation />,
        },
        {
          path: "buy/detail",
          element: <BuyDetail />,
        },

        {
          path: "welcome-back",
          element: <WelcomeBack />,
        },

        {
          path: "/recieve-nft",
          element: <RecieveNft />,
        },
        {
          path: "/buy-history",
          element: <BuyHistory />,
        },
        {
          path: "/send-history",
          element: <SendHistory />,
        },
        {
          path: "/swap-history",
          element: <SwapHitory />,
        },
        {
          path: "/stake-history",
          element: <StakeHistory />,
        },
        {
          path: "/recieve-history",
          element: <RecieveHistory />,
        },
        {
          path: "select-third",
          element: <ThirdParty />,
        },
        {
          path: "connecting",
          element: <Connecting />,
        },
        {
          path: "wallet-details",
          element: <WalletDetails />,
        },
        {
          path: "edit-wallet-name",
          element: <EditWalletName />,
        },
        {
          path: "show-seed",
          element: <ShowSeed />,
        },
        {
          path: "show-seed-phrase",
          element: <ShowSeedPhrase />,
        },
        {
          path: "edit-account",
          element: <EditAccount />,
        },
        {
          path: "edit-account-name",
          element: <EditAccountName />,
        },
        {
          path: "edit-account-avatar",
          element: <EditAccountAvatar />,
        },
        {
          path: "show-address",
          element: <ShowAddress />,
        },
        {
          path: "show-private-key",
          element: <ShowPrivateKey />,
        },
        {
          path: "your-prv-key",
          element: <YourPrvKey />,
        },
        {
          path: "security",
          element: <Security />,
        },
        {
          path: "security/confirm-currentPIN",
          element: <ConfirmPIN />,
        },
        {
          path: "security/newPIN",
          element: <NewPIN />,
        },
        {
          path: "resetApp",
          element: <ResetApp />,
        },
        {
          path: "send/ready-nft",
          element: <ReadySendNFT />,
        },
        {
          path: "/manage-wallet",
          element: (
            <Wallets
              handleClose={(value) => {
                console.log("Close Wallet Modal:", value);
              }}
              handleAddWallet={() => {
                console.log("Add Wallet Clicked");
              }}
              handleSelectWallet={() => {
                console.log("Select Wallet Clicked");
              }}
            />
          ),
        },
      ],
    },
  ]
  // {
  //   initialEntries: ["/create"],
  //   initialIndex: 0,
  // }
);