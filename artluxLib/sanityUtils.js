import { useRouter } from "next/router";

// Main Page

// Collections Fetch
export const animalsQuery = `*[_type == "collections"] {
    "logoImageUrl": logoImage.asset->url,
     "bannerImageUrl": bannerImage.asset->url,
    "featuredImageUrl": featuredImage.asset->url,
     volumeTraded,
     createdBy,
     contractAddress,
     creator,
     "createdBy": createdBy->userName,
     title, 
     floorPrice,    
     description
}`;
// Categroy Fetch
export const categoryListQuery = `*[_type == "category"] {
    category,
    icon,
    url,
    "featuredImageUrl": featuredImage.asset->url,
  }`;
// Blockchain Fetch
export const blockchainListQuery = `*[_type == "blockchain"] {
    chainName, 
    "icon": icon.asset->url,
    "id": _id,
  }`;

// Collections Fetch With ID

const blockchainList = `*[_type == "blockchain"] {
    chainName,
    
      
        "icon": icon.asset->url,
  "id": _id,
  }`;
const categoryList = `*[_type == "category"] {
      category,
      
        
          "icon": icon.asset->url,
    "id": _id,
    }`;
