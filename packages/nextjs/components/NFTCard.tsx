"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";

const style = {
  wrapper: `bg-base-100 flex-auto w-[14rem] h-[22rem] my-5 mx-5 rounded-2xl overflow-hidden relative group shadow-xl`,
  imgContainer: `relative h-2/3 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full h-full object-cover transition-transform duration-300 ease-in-out`,
  details: `p-3`,
  info: `flex justify-between drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm`,
  assetName: `font-light text-sm mt-1`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] flex items-center w-full justify-start font-normal mt-1`,
  likeIcon: `text-md w-4 mr-2`,
  orderTab: `absolute bottom-0 left-0 right-0 top-auto bg-base-300 py-5 px-2 rounded-b-2xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col justify-center items-center`,
  sizeLabel: `mr-2 self-center`,
  sizeWrapper: `flex items-center justify-center mb-5`,
  sizeSelect: `inline-block bg-base-100 py-1 px-3 rounded text-center cursor-pointer`,
  orderButton: `bg-blue-500 text-white py-2 px-4 rounded w-full text-lg font-medium cursor-pointer`,
  modal: `fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-10 shadow-xl`,
  modalContent: `bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 max-w-lg w-full p-6 relative`,
  closeModalButton: `bg-base-100 p-2 rounded-full absolute top-4 right-2 mt-2 mr-2`,
  addressInput: `input input-ghost h-[2.2rem] min-h-[2.2rem] p-2 border w-full font-medium placeholder:text-accent/50 text-gray-400 bg-base-200 rounded-sm text-accent mb-2`,
  addressHeader: `mt-1 mb-4 text-lg`, // New style for the header text
  confirmOrderButton: `bg-blue-500 text-white py-2 px-4 rounded w-full cursor-pointer`,
};

interface NFTItem {
  id: string;
  image: string;
  name: string;
  likes?: number;
}

interface Listing {
  asset: {
    id: string;
  };
  buyoutCurrencyValuePerToken: {
    displayValue: string;
  };
}

interface NFTCardProps {
  nftItem: NFTItem;
  title: string;
  listings: Listing[];
}

const NFTCard: React.FC<NFTCardProps> = ({ nftItem, title, listings }) => {
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [address, setAddress] = useState({
    fullName: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    stateProvinceRegion: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    const listing = listings.find(listing => listing.asset.id === nftItem.id);
    if (listing) {
      setIsListed(true);
      setPrice(listing.buyoutCurrencyValuePerToken.displayValue);
    }
  }, [listings, nftItem.id]);

  const toggleModal = () => setShowModal(!showModal);

  const handleEstimatePrice = () => {
    // Placeholder logic for price estimation
    const estimated = "49.99 USDT";
    setEstimatedPrice(estimated);
    setShowConfirmOrder(true);
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setAddress(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.imgContainer}>
        <Image src={nftItem.image} alt={nftItem.name} layout="fill" objectFit="cover" className={style.nftImg} />
      </div>
      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>{title}</div>
            <div className={style.likes}>
              <HeartIcon className={style.likeIcon} />
              {nftItem.likes}
            </div>
            <div className={style.assetName}>{nftItem.name}</div>
          </div>
          {isListed && (
            <div className={style.infoRight}>
              <div className={style.priceTag}>Price</div>
              <div className={style.priceValue}>
                <Image
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="ETH Logo"
                  layout="fill"
                  objectFit="cover"
                  className={style.ethLogo}
                />
                {price}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={style.orderTab}>
        <div className={style.sizeWrapper}>
          <label className={style.sizeLabel}>Size:</label>
          <select className={style.sizeSelect}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <button className={style.orderButton} onClick={toggleModal}>
          Order Now
        </button>
      </div>
      {showModal && (
        <div className={style.modal} onClick={toggleModal}>
          <div className={style.modalContent} onClick={e => e.stopPropagation()}>
            <button className={style.closeModalButton} onClick={toggleModal}>
              X
            </button>
            <div className={style.addressHeader}>Fill in Your Shipping Address</div>
            <input
              className={style.addressInput}
              placeholder="Full Name"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
            />
            <input
              className={style.addressInput}
              placeholder="Street Address Line 1"
              name="streetAddress1"
              value={address.streetAddress1}
              onChange={handleChange}
            />
            <input
              className={style.addressInput}
              placeholder="Street Address Line 2"
              name="streetAddress2"
              value={address.streetAddress2}
              onChange={handleChange}
            />
            <input
              className={style.addressInput}
              placeholder="City"
              name="city"
              value={address.city}
              onChange={handleChange}
            />
            <input
              className={style.addressInput}
              placeholder="State/Province/Region"
              name="stateProvinceRegion"
              value={address.stateProvinceRegion}
              onChange={handleChange}
            />
            <input
              className={style.addressInput}
              placeholder="Postal Code"
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
            />
            <input
              className={style.addressInput}
              placeholder="Country"
              name="country"
              value={address.country}
              onChange={handleChange}
            />
            {!showConfirmOrder && (
              <button className={style.confirmOrderButton} onClick={handleEstimatePrice}>
                Estimate Price
              </button>
            )}
            {showConfirmOrder && (
              <>
                <div>Estimated Price: {estimatedPrice}</div>
                <button className={style.confirmOrderButton}>Confirm Order</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTCard;
