🚀 CampusChain – A Decentralized College Marketplace
📌 Overview

CampusChain is a blockchain-powered decentralized application (DApp) that allows students to buy, sell, and trade items, notes, and services directly within their college community — without intermediaries.
Built with Solidity, Hardhat, and Web3.js, it ensures transparency, trust, and security through blockchain-based verification.

✨ Key Features

🏫 Campus-Exclusive Marketplace – Connects students for selling and buying used goods, notes, or services.

🔐 Decentralized Identity – User profiles verified via blockchain wallet (MetaMask).

💸 Smart Payments – Peer-to-peer transactions handled securely using smart contracts.

🧾 Proof of Ownership – Each item/token minted as a unique on-chain record (NFT-style).

📊 Verified Seller Badges – Builds trust with verified wallet-based profiles.

🌐 Seamless Web3 Integration – Interacts directly with the Ethereum blockchain via Web3.js or Ethers.js.

🏗️ Tech Stack
Layer	Technology
Smart Contracts	Solidity, Hardhat
Frontend	HTML, CSS, JavaScript, 
Blockchain	Ethereum / Polygon Testnet
Web3 Integration	Ethers.js / Web3.js
Wallet	MetaMask
Backend (optional)	Node.js + Express
Database (optional)	MongoDB (for off-chain metadata)
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/khushi/CampusChain_Marketplace.git
cd CampusChain_Marketplace

2️⃣ Install dependencies
npm install

3️⃣ Compile smart contracts
npx hardhat compile

4️⃣ Deploy to local network
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

5️⃣ Start frontend
npm run dev


Then open → http://localhost:3000

🔗 Smart Contract Structure

Marketplace.sol → Handles item listing, purchasing, and ownership transfers.

UserRegistry.sol → Manages student verification and user reputation.

Token.sol (optional) → Implements ERC-20/721 token for marketplace transactions.

🧠 Future Roadmap

🔸 AI-based product recommendations

🔸 Multi-campus listing system

🔸 Decentralized reviews & ratings

🔸 Integration with IPFS for item storage

🔸 Cross-chain support (Polygon, Base, Solana bridges)

💡 Impact

Students → Empowered to monetize skills & resources

Colleges → Builds self-sustaining campus ecosystems

Community → Promotes transparency, sustainability & digital literacy


📜 License

This project is licensed under the MIT License – feel free to use, modify, and share with credit.