import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { baseSepolia, arbitrumSepolia } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = "638d63fc42e61df1510474c2a408b991";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [arbitrumSepolia, baseSepolia];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
