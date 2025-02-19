![The Prism Banner](https://github.com/gugasanchez/theprism/assets/62973287/ac16ce4e-cced-4a22-8570-f42ae4346cba)

# [The Prism](https://the-prism-eth-samba.vercel.app/) ▲

Unleash your creativity with The Prism, a cutting-edge platform where art meets blockchain to make your designs wearable. Dive into a world where AI-generated images become tangible and every creation is a unique fashion statement.

## ✨ Features Overview

- **🎨 Creative Design Production**: Harness the power of self-trained models based on open-source stable-diffusion ML to turn your inspirations into unique digital masterpieces, blockchain-ready.

- **🔐 Exclusive Products & Proof of Inspiration**: Utilize Chainlink functions for verifiable computations, ensuring each artwork's inspiration and uniqueness. Mint your creations as NFTs with Scroll's technology for unmatched exclusivity.

- **🤝 Direct Marketplace for Creators and Manufacturers**: A bridge between digital creators and physical manufacturers, allowing artists to "burn" their NFTs and commission the production of tangible goods that previously existed only in the digital realm.

- **🏭 Smart Manufacturing Guidance**: Advanced models provide precise, confidential parameters to manufacturers, ensuring the production of original and exclusive pieces, safeguarding your creativity.

- **📦 Blockchain-Enhanced Production Chain**: Record the entire journey from design to manufacturing on the blockchain, offering unparalleled security, verifiability, and trust for all parties involved.

- **🛍️ Unique Marketplace for Exclusive Designs**: A dedicated space for designers to showcase and sell their one-of-a-kind pieces to customers seeking truly unique, blockchain-authenticated art and design.

## 🏗️ System Architecture

<div align="center">
  <img src="https://github.com/ryanviana/the-prism_eth-samba/assets/70733914/e4555502-4d6e-4235-a39a-298bd192b9ca" width="300" style="margin: 20px;" alt="Workflow Process"/> 
  <img src="https://github.com/ryanviana/the-prism_eth-samba/assets/70733914/bfc72bd9-7d41-48b3-bbd8-7b8bf6afc1b9" width="300" style="margin: 20px;" alt="NFT Architecture"/>
</div>

<p align="center">
  <i>Explore the foundational structure and detailed components that drive our platform, alongside the workflow process that ensures seamless operation.</i>
</p>

## 🤖 Machine Learning Model: Current Strategy & Future Vision

### Current Implementation - Stabble Diffusion

Currently, our platform incorporates a cutting-edge application of stable-diffusion technology, albeit through a paid product not fully tailored to our specific needs. Here's how the process unfolds:

- **📝 Prompt Submission**: Users input their design idea into our system.
- **🔗 Proof-of-Inspiration Contract**: This contract records the user's prompt.
- **🛠️ Stable-Diffusion API Interaction**: Leveraging Chainlink function calls, the system communicates with the stable-diffusion API to generate the design.
- **🗃️ Image & Hash Management**: The resulting image is stored in our file management system, and a hash of the image is generated.
- **📊 Mapping Structure Storage**: The original prompt and the image hash are stored together, establishing a verifiable link between the inspiration and the generated image.

### Future Vision - Proprietary ML Model

#### Enhanced Model Training & Open-Source Accessibility

- **👩‍🔬 Model Development**: We plan to develop and train our model to tailor it precisely to our platform's requirements. Post-development, the model will be made open-source, enabling public verification of our image processing techniques based on user prompts.
- **🎛️ Advanced User Interface**: Drawing inspiration from user-friendly frameworks like Fooocus, we aim to offer an interface that provides extensive customization options. Users will have the ability to adjust a wide range of parameters, fostering greater creativity in design generation.

#### Tailored Design Generation

- **👕 T-Shirt Design Focus**: Our models will undergo specific training to optimize the generation of t-shirt designs that are not only aesthetically pleasing but also suitable for manufacturing, based on user inputs.
- **⚙️ Manufacturing Parameters Integration**: In addition to design aesthetics, the model will consider optimal manufacturing parameters to ensure that designs are ready for production, enhancing the bridge between digital creativity and physical merchandise.

## 🛠️ Services Stack

Our platform leverages a cutting-edge stack of technologies and services designed to enhance user experience, ensure security, and foster innovation. Here's a look at the key services in our stack and how we use them:

- **🖱 Particle Connect**: Simplifies the user experience by offering social login capabilities. This service allows users to benefit from blockchain technology without needing in-depth knowledge of how wallets or blockchain work.
   - [🔎 Explore the Code](./packages/nextjs/components/ThePrismAppWithProviders.tsx)


- **🔗 Chainlink Integration**: Central to our ecosystem, Chainlink Functions are instrumental for executing verifiable API requests. This technology underpins our unique approach, facilitating the generation of a "proof of inspiration" from a given prompt to an image. It's a cornerstone in guaranteeing the authenticity and originality of each design, fostering trust in our creative process.
  -  [🔎 Explore the Code](./packages/hardhat/contracts/DesignFunctions.sol)

- **👩‍💻 Scaffold Eth 2**: A comprehensive toolkit for Ethereum developers, Scaffold-ETH 2 helps us rapidly deploy Solidity smart contracts and launch a DApp with a React frontend. It includes Hardhat for smart contract development and Next.js for building user-friendly interfaces, streamlining our development process.
    
- **⚡️ Scroll**: We use Scroll as our Layer 2 solution to take advantage of lower transaction fees. This is particularly important for our platform since we deal with products that may not have a high aggregated value, making efficiency and cost-effectiveness key.
    - [🔎 Explore the Code](./packages/hardhat/contracts)

- **🌄 Segmind**: Segmind powers our stable diffusion calls and model training. It provides the API and computational resources we need to generate unique and creative designs from user prompts, ensuring that our platform remains at the forefront of AI-driven digital art creation.
  - [🔎 Explore the Code](./packages/backend/design_diffusion/src/design/design.service.ts)
 

## 📒 Contracts

### NFT Factory Contract

- **Address:** [0x869181609CD5A911aE43d695A03A38bba5F74A01](https://sepolia.scrollscan.com/address/0x869181609CD5A911aE43d695A03A38bba5F74A01)
- **Purpose:** NFT Factory contract used to deploy an ERC721 Contract for each user and manage these contracts. Here we can take a look in all NFT contracts deployed and all purchases made in each of them.

### CustomTShirtNFT 

- **Address** (example deployed to an user): [0xb3f28ad65855aa0cd7949adb477e13085348f625](https://sepolia.scrollscan.com/address/0xb3f28ad65855aa0cd7949adb477e13085348f625)
- **Purpose:** Each user will have him own CustomTShirtNFT contract. When you create a new T-shirt design and save it, a new NFT will be minted to your address. The NFT Factory is used to call functions in these contracts.

### USDT Contract

- **Address:** [0x9c4BD6453BdbA9E58F4A881A2C6BB0683EdcA0B9](https://sepolia.scrollscan.com/address/0x9c4BD6453BdbA9E58F4A881A2C6BB0683EdcA0B9)
- **Purpose:** Simulate an stablecoin to make payments when an user buy a T-Shirt.

## 📚 Resources

- **[The Prism](https://the-prism-eth-samba.vercel.app/)**: Discover the full capabilities of The Prism Platform, explore our features, and learn how we're changing the game in digital-to-physical art conversion.

- **[Our Pitch Deck](https://www.canva.com/design/DAGASoj2moo/k05LvPOLeTAI26mbPsUXWQ/edit?utm_content=DAGASoj2moo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)**: Dive deeper into our business model, technology, and the market opportunity with our comprehensive pitch deck. Understand our vision, strategy, and how we plan to grow.

- **[Our Demo](https://www.youtube.com/watch?v=c19WSWHkE6w)**: Experience The Prism Platform in action. Our demo provides a hands-on look at how users can create, mint, and translate digital art into physical products seamlessly.

- **[Our Backend](https://the-prism-backend.vercel.app/designs)**: The Prism Backend stores and manages base64 encoded images, designed for easy frontend integration.

### Conclusion
Our project is at the forefront of combining machine learning with fashion design, creating a unique platform for personalized apparel. As we continue to develop and refine our technology, we aim to offer users an unparalleled ability to bring their creative visions to life, whether through owning a unique piece of wearable art or by stepping into the role of a designer in the digital marketplace.

## 📁 Resources

- [Forbes | The Hyper-Personalization trend](https://www.forbes.com/sites/eladnatanson/2023/06/01/hyper-personalization-is-already-here---its-future-is-even-more-cutting-edge/?sh=414917c55cc2)
- [Forbes | E-commerce 3.0](https://www.forbes.com/sites/onmarketing/2023/08/23/e-commerce-30-the-future-of-retail-is-hyper-personalized/?sh=43c9ce693d30)
- [The Guardian | AI & Fashion Billionaire Market](https://www.theguardian.com/fashion/2024/feb/08/ai-london-fashion-week)

## 👥 Team Prism
- [@ryanviana](https://www.github.com/ryanviana)
- [@pjvperes](https://www.github.com/pjvperes)
- [@gugasanchez](https://www.github.com/gugasanchez)

---

© 2024 The Prism. A new spectrum of digital art and fashion.


