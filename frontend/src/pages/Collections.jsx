import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { shopContext } from "../context/ShopContext";
import { images } from "../assets/assets";
import ProductItem from "../components/ProductItem";
import PaginationRounded from "../components/PaginationRounded";
import Filter from "../components/Filter";
import { useParams } from "react-router-dom";

const Collections = ({ searchResult }) => {
  const { products, search, showSearch, getProductsData,totalPages } = useContext(shopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const {category}=useParams();
  

  const [page,setPage]=useState(1);
  const handlePageChange=(e,v)=>{
    setPage(v);
  }
  useEffect(() => {
    getProductsData(page,'',10);
  }, [page])
  useEffect(() => {
    if (products.length) {
      setFilterProducts(products)
    }
  }, [products])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        {/* Filter Sidebar */}

        <Filter />
        {/* Main Content */}
        <div className="flex-1">
          {/* Header + Sort */}
          <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
            <Title text1="ALL " text2="COLLECTIONS" />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 text-sm px-2 py-1 rounded"
            >
              <option value="relevant">Sort By: Relevant</option>
              <option value="low-high">Sort By: Low to High</option>
              <option value="high-low">Sort By: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          {filterProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {filterProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-20">No products found.</p>
          )}
        </div>

      </div>
      <div className="flex items-center justify-center pt-36">
        <PaginationRounded page={page} count={totalPages} onChange={handlePageChange}/>
      </div>
    </div>
  );
};

export default Collections;