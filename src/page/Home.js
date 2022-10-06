import React, { useState } from "react";
import { CartState } from "../context/Context";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { Button } from "react-bootstrap";

import SingleProduct from "../components/SingleProduct";
import TableProductView from "../components/TableProductView";
import CompareProducts from "./CompareProducts";

const Home = () => {
  const {
    state: { products },
    productState: { productState },
  } = CartState();
  const [tableViewToggle, setTableViewToggle] = useState(false);
  const [selectComparedProducts, setSelectComparedProducts] = useState([]);
  const [compareView, setCompareView] = useState(false);

  const goToComparePage = () => {
    setCompareView(!compareView)
  }

  const clearCompareProducts = () => {
    setCompareView(false);
    setSelectComparedProducts([])
  }

  const handleCompareProductDelete = (id) => {
    setSelectComparedProducts(selectComparedProducts.filter((product) => product.id !== id))
  }

  const handleBackToHomePage = () => {
    setCompareView(false);
    setSelectComparedProducts([])
  }

  return (
    <div className="home">
      <div className="productContainer">
        {(selectComparedProducts.length === 0 && !compareView) &&
          <div className="toggle-btn">
            <span className="tableView">
              {tableViewToggle ? "Table View" : "Grid View"}
            </span>
            <BootstrapSwitchButton
              className="pull-right"
              checked={tableViewToggle}
              size="sm"
              onChange={() => setTableViewToggle(!tableViewToggle)}
            />
          </div>
        }

        {!compareView &&
          <>
            <div className="compare-btn">
              <Button
                verient="primary"
                disabled={(selectComparedProducts.length <= 1)
                  ? true
                  : false}
                size="sm"
                onClick={() => goToComparePage()}
              >Compared Products
              </Button>
            </div>
          </>
        }

        <div className={!compareView ? "clear-compare-btn" : "compareView-clear-compare-btn"}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => clearCompareProducts()}
          >
            Clear Compare Products
          </Button>
        </div>

        {compareView ?
          <CompareProducts
            setSelectComparedProducts={setSelectComparedProducts}
            handleCompareProductDelete={handleCompareProductDelete}
            handleBackToHomePage={handleBackToHomePage}
            compareProducts={selectComparedProducts}
          /> :
          <>
            {tableViewToggle ?
              (
                <TableProductView
                  selectComparedProducts={selectComparedProducts}
                  setSelectComparedProducts={setSelectComparedProducts}
                  products={productState}
                />
              )
              :
              (
                productState?.map((prod) => (
                  <SingleProduct
                    prod={prod}
                    key={prod.id}
                    setSelectComparedProducts={setSelectComparedProducts}
                    selectComparedProducts={selectComparedProducts}
                  />
                ))
              )
            }
          </>
        }
      </div>
    </div>
  );
};

export default Home;
