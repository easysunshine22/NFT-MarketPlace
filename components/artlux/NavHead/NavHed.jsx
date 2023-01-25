import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import {
  isChildrenPageActive,
  isParentPageActive,
} from "../../../utils/daynamicNavigation";
import { useRouter } from "next/router";
import Link from "next/link";
import { explore, resource, stats } from "../../../artluxData/navbar";
//Icons
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineTable, AiOutlineSetting } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";

//Thirdweb
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

//sanity
import { client } from "../../../lib/sanityClient";

const NavHed = () => {
  const route = useRouter();

  const [filterData, setfilterData] = useState([]);

  const [wordFilter, setWordFilter] = useState("");

  const clearInput = () => {
    setfilterData([]);
    setWordFilter("");
  };

  //Thirdweb
  const address = useAddress();

  // Sanity
  const [collection, setCollection] = useState({});
  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "users" && walletAddress=="${address}"] {
        userName,
        walletAddress,
        "profileImageUrl" : profileImage.asset->url,
      }`;

    const collectionData = await sanityClient.fetch(query);
    await setCollection(collectionData[0]);
  };

  const filterNftData = async (sanityClient = client) => {
    const query = `*[[title, userName] match "${wordFilter}*"] { 
        _type,
        title,
        "logoImageUrl": logoImage.asset->url,
        userName,
        "logoImageUrla": profileImage.asset->url,
      }`;

    const filterNftsData = await client.fetch(query);
    await setfilterData(filterNftsData);
  };
  console.log(filterData);

  useEffect(() => {
    if (!address) {
      return;
    } else {
      fetchCollectionData();
    }
  }, [address]);

  return (
    <header className="header-area" id="header_area">
      <nav className="navbar navbar-expand-xl">
        <div className="container-fluid custom-container">
          <a className="navbar-brand" href="/">
            <img src="/artlux.png" className="w-[80px]" />
          </a>

          <ul className="header-meta ms-auto mobile-meta">
            <li className="nav-item">
              <Link href={`/user/${collection.userName}`}>
                <a className="nav-link" href="#">
                  <img src="/images/user.png" alt="" />
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href={`/user/${collection.userName}`}>
                <a className="nav-link" href="#">
                  <img src="/images/wallet.png" alt="" />
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={`/user/${collection.userName}`}>
                <a className="nav-link" href="#">
                  <img src="/images/cart.png" alt="" />
                </a>
              </Link>
            </li>
          </ul>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main_nav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>

          <div className="collapse navbar-collapse" id="main_nav">
            <ul className="navbar-nav ms-auto">
              {/* Explore */}
              <li className=" nav-item  group relative">
                <Link href="/collection/explore_collection">
                  <button className=" text-jacarta-700 font-size=[18px] hover:text-[#d831b3] focus:text-[#d831b3]   flex items-center justify-between py-3.5  dark:text-white lg:px-5 w-full">
                    <span
                      className={
                        isParentPageActive(explore.pages, route.asPath)
                          ? "text-accent dark:text-accent nav-item"
                          : ""
                      }>
                      Explore
                    </span>
                    <i className="lg:hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        className="h-4 w-4 dark:fill-white">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                      </svg>
                    </i>
                  </button>
                </Link>
                <ul
                  className="dropdown-menu dark:bg-jacarta-800 left-0 top-[85%] z-10 hidden min-w-[200px] gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:visible group-hover:opacity-100 lg:invisible lg:absolute lg:grid lg:translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2 relative"
                  aria-labelledby="navDropdown-4">
                  {explore?.pages?.map?.((page) => (
                    <li key={page.id}>
                      <Link href={page.path}>
                        <a className="dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center rounded-xl px-5 py-2 transition-colors">
                          <span className="bg-light-base mr-3 rounded-xl p-[0.375rem]">
                            {page?.icon}
                          </span>
                          <span
                            className="font-display 
                               text-jacarta-700
                            text-sm">
                            {page?.name}
                          </span>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* drops */}
              <li className=" nav-item  group relative ">
                <Link href="/create">
                  <a>
                    <button className="text-jacarta-700  font-size=[18px] hover:text-[#d831b3] focus:text-[#d831b3] flex items-center justify-between py-3.5  dark:text-white lg:px-5">
                      <span className="text-jacarta-700 nav-item">Drops</span>
                    </button>
                  </a>
                </Link>
              </li>

              {/* Stats */}
              <li className=" nav-item  group relative">
                <button className=" text-jacarta-700 font-size=[18px] hover:text-[#d831b3] focus:text-[#d831b3]   flex items-center justify-between py-3.5  dark:text-white lg:px-5 w-full">
                  <span
                    className={
                      isParentPageActive(stats.pages, route.asPath)
                        ? "text-accent dark:text-accent nav-item"
                        : ""
                    }>
                    Stats
                  </span>
                  <i className="lg:hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      className="h-4 w-4 dark:fill-white">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                    </svg>
                  </i>
                </button>
                <ul
                  className="dropdown-menu dark:bg-jacarta-800 left-0 top-[85%] z-10 hidden min-w-[200px] gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:visible group-hover:opacity-100 lg:invisible lg:absolute lg:grid lg:translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2 relative"
                  aria-labelledby="navDropdown-4">
                  {stats?.pages?.map?.((page) => (
                    <li key={page.id}>
                      <Link href={page?.path}>
                        <a className="dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center rounded-xl px-5 py-2 transition-colors">
                          <span
                            className={`font-display ${
                              isChildrenPageActive(page.path, route.asPath)
                                ? "text-accent dark:text-accent"
                                : "text-jacarta-700"
                            } text-sm dark:text-white`}>
                            {page?.name}
                          </span>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* resource */}
              <li className=" nav-item  group relative">
                <button className="flex items-center justify-between py-3.5 font-size=[18px] hover:text-[#d831b3] focus:text-[#d831b3]    dark:text-white lg:px-5 w-full">
                  <span
                    className={
                      isParentPageActive(resource.pages, route.asPath)
                        ? "text-accent dark:text-accent nav-item"
                        : ""
                    }>
                    Resources
                  </span>
                  <i className="lg:hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      className="h-4 w-4 dark:fill-white">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                    </svg>
                  </i>
                </button>
                <ul
                  className="dropdown-menu dark:bg-jacarta-800 left-0 top-[85%] z-10 hidden min-w-[200px] gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:visible group-hover:opacity-100 lg:invisible lg:absolute lg:grid lg:translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2 relative"
                  aria-labelledby="navDropdown-4">
                  {resource?.pages?.map?.((page) => (
                    <li key={page.id}>
                      <Link href={page?.path}>
                        <a className="dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center rounded-xl px-5 py-2 transition-colors">
                          <span
                            className={`font-display ${
                              isChildrenPageActive(page.path, route.asPath)
                                ? "text-accent dark:text-accent"
                                : "text-jacarta-700"
                            } text-sm dark:text-white`}>
                            {page?.name}
                          </span>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className=" nav-item  group relative xl:hidden">
                <ConnectWallet />
              </li>
            </ul>

            <ul className="search-meta ms-auto">
              <li>
                <div className="form-group">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search"
                    onChange={(e) => {
                      setWordFilter(e.target.value);
                      filterNftData();
                    }}
                  />

                  {filterData.length === 0 ? (
                    <i>
                      <FaSearch />
                    </i>
                  ) : (
                    <i>
                      <AiOutlineClose onClick={clearInput} />
                    </i>
                  )}
                </div>
                {filterData.length != 0 && (
                  <div className="dataResult">
                    {filterData
                      .filter((value) => value._type === "collections")
                      .slice(0, 15)
                      .map((value) => (
                        <a
                          className="dataItem justify-between pr-2"
                          href={value.link}
                          target="_blank">
                          <img
                            src={value.logoImageUrl}
                            className="w-8 h-8 ml-2 justify-center rounded-full"
                          />
                          <p className="align-left">{value.title} </p>
                          <span className="font-bold">Collections</span>
                        </a>
                      ))}

                    {filterData
                      .filter((nftss) => nftss._type === "nft")
                      .slice(0, 15)
                      .map((nftss) => (
                        <a
                          className="dataItem justify-between pr-2"
                          href={nftss.link}
                          target="_blank">
                          <img
                            src={nftss.logoImageUrl}
                            className="w-8 h-8 ml-2 justify-center rounded-full"
                          />
                          <p>{nftss.title} </p>
                          <span className="font-bold">NFTs</span>
                        </a>
                      ))}
                    {filterData
                      .filter((userss) => userss._type === "users")
                      .slice(0, 15)
                      .map((userss) => (
                        <a
                          className="dataItem justify-between pr-2"
                          href={userss.link}
                          target="_blank">
                          <img
                            src={userss.logoImageUrla}
                            className="w-8 h-8 ml-2 justify-center rounded-full"
                          />
                          <p>{userss.userName} </p>
                          <span className="font-bold">Users</span>
                        </a>
                      ))}
                  </div>
                )}
              </li>
            </ul>

            <ul className="header-meta ">
              <div className="mr-[15px] js-nav-dropdown group-dropdown relative">
                <button className="nav-link  hover:bg-orange focus:bg-accent group dark:hover:bg-accent ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]">
                  {address ? (
                    <img src="/images/14.png" alt="" className="rounded-full" />
                  ) : (
                    <img src="/images/user.png" alt="" />
                  )}
                </button>
                {address ? (
                  <div className="dropdown-menu dark:bg-jacarta-800 group-dropdown-hover:opacity-100 group-dropdown-hover:visible !-right-4 !top-[85%] !left-auto z-10 min-w-[14rem] whitespace-nowrap rounded-xl bg-white transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full lg:absolute lg:grid lg:!translate-y-4 lg:py-4 lg:px-2 lg:shadow-2xl hidden lg:invisible lg:opacity-0">
                    <Link href={`/user/${collection.userName}`}>
                      <a className="dark:hover:bg-jacarta-600 hover:text-orange focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
                        <VscAccount />
                        <span className="font-display text-jacarta-700 mt-1 text-sm dark:text-white">
                          Profile
                        </span>
                      </a>
                    </Link>
                    <Link href="/collection">
                      <a className="dark:hover:bg-jacarta-600 hover:text-orange focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
                        <AiOutlineTable />
                        <span className="font-display text-jacarta-700 mt-1 text-sm dark:text-white">
                          My Collections
                        </span>
                      </a>
                    </Link>
                    <Link href="/create">
                      <a className="dark:hover:bg-jacarta-600 hover:text-orange focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
                        <IoCreateOutline />
                        <span className="font-display text-jacarta-700 mt-1 text-sm dark:text-white">
                          Create
                        </span>
                      </a>
                    </Link>

                    <Link href={`/profile/${collection.userName}`}>
                      <a className="dark:hover:bg-jacarta-600 hover:text-orange focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
                        <AiOutlineSetting />
                        <span className="font-display text-jacarta-700 mt-1 text-sm dark:text-white">
                          Settings
                        </span>
                      </a>
                    </Link>
                    <Link href="/login">
                      <a className="dark:hover:bg-jacarta-600 hover:text-orange focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
                        <CiLogout />
                        <span className="font-display text-jacarta-700 mt-1 text-sm dark:text-white">
                          Log out
                        </span>
                      </a>
                    </Link>
                  </div>
                ) : (
                  <div className="dropdown-menu dark:bg-jacarta-800 group-dropdown-hover:opacity-100 group-dropdown-hover:visible !-right-4 !top-[85%] !left-auto z-10 min-w-[14rem] whitespace-nowrap rounded-xl bg-white transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full lg:absolute lg:grid lg:!translate-y-4 lg:py-4 lg:px-2 lg:shadow-2xl hidden lg:invisible lg:opacity-0">
                    <Link href="/login">
                      <a className="dark:hover:bg-jacarta-600 hover:text-orange focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
                        <VscAccount />
                        <span className="font-display text-jacarta-700 mt-1 text-sm dark:text-white">
                          Login
                        </span>
                      </a>
                    </Link>
                  </div>
                )}
              </div>

              <div className="mr-[15px] js-nav-dropdown group-dropdown relative">
                <button className="nav-link  hover:bg-orange focus:bg-accent group dark:hover:bg-accent ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]">
                  <img src="/images/wallet.png" alt="" />
                </button>
                <div className="dropdown-menu dark:bg-jacarta-800 group-dropdown-hover:opacity-100 group-dropdown-hover:visible !-right-4 !top-[85%] !left-auto z-10 min-w-[14rem] whitespace-nowrap rounded-xl bg-white transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full lg:absolute lg:grid lg:!translate-y-4 lg:py-4 lg:px-2 lg:shadow-2xl hidden lg:invisible lg:opacity-0">
                  <Link href="#">
                    <a className="dark:hover:bg-jacarta-600 hover:text-orange focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
                      <span className="font-display text-jacarta-700 mt-1 text-sm dark:text-white">
                        <ConnectWallet />
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
              {/* 
              <div className="mr-[15px] js-nav-dropdown group-dropdown relative">
                <button className="nav-link  hover:bg-orange focus:bg-accent group dark:hover:bg-accent ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]">
                  <img src="/images/cart.png" alt="" />
                </button>
                <div className="dropdown-menu dark:bg-jacarta-800 group-dropdown-hover:opacity-100 group-dropdown-hover:visible !-right-4 !top-[85%] !left-auto z-10 min-w-[14rem] whitespace-nowrap rounded-xl bg-white transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full lg:absolute lg:grid lg:!translate-y-4 lg:py-4 lg:px-2 lg:shadow-2xl hidden lg:invisible lg:opacity-0">
                  <Link href="#">
                    <a className="dark:hover:bg-jacarta-600 hover:text-orange focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
                      <VscAccount />
                      <span className="font-display text-jacarta-700 mt-1 text-sm dark:text-white">
                        Profile
                      </span>
                    </a>
                  </Link>
                  <Link href="/collection">
                    <a className="dark:hover:bg-jacarta-600 hover:text-orange focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
                      <AiOutlineTable />
                      <span className="font-display text-jacarta-700 mt-1 text-sm dark:text-white">
                        My Collections
                      </span>
                    </a>
                  </Link>
                  <Link href="/create">
                    <a className="dark:hover:bg-jacarta-600 hover:text-orange focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
                      <IoCreateOutline />
                      <span className="font-display text-jacarta-700 mt-1 text-sm dark:text-white">
                        Create
                      </span>
                    </a>
                  </Link>

                  <Link href="#">
                    <a className="dark:hover:bg-jacarta-600 hover:text-orange focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
                      <AiOutlineSetting />
                      <span className="font-display text-jacarta-700 mt-1 text-sm dark:text-white">
                        Settings
                      </span>
                    </a>
                  </Link>
                  <Link href="/login">
                    <a className="dark:hover:bg-jacarta-600 hover:text-orange focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
                      <CiLogout />
                      <span className="font-display text-jacarta-700 mt-1 text-sm dark:text-white">
                        Log out
                      </span>
                    </a>
                  </Link>
                </div>
              </div> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavHed;
