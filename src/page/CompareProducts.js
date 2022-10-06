import React, { useEffect } from 'react'
import { Button, Image } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { AiFillDelete } from "react-icons/ai";


export default function CompareProducts({ compareProducts, handleCompareProductDelete, handleBackToHomePage }) {
  return (
    <>
      {
        compareProducts.length > 0 ? (
          <Table
            className='compare-product-container'
            striped
            bordered
            hover
          >
            <tbody>
              <tr>
                <th>Product</th>
                {compareProducts.map((prod) =>
                  <td
                    className='compare-product-td-container'
                    key={prod.id}>
                    <b>{prod.name}</b>
                    <span className='compare-product-delete-btn'>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleCompareProductDelete(prod.id)}
                      />
                    </span>
                  </td>
                )}
              </tr>
              <tr>
                <th>Product Image</th>
                {compareProducts.map((prod) =>
                  <td key={prod.id}>
                    {
                      <Image
                        src={`${prod.image}.jpg`}
                        alt={prod.name}
                        width="80"
                        height="80"
                      />}
                  </td>
                )}
              </tr>
              <tr>
                <th>Price</th>
                {compareProducts.map((prod) =>
                  <td key={prod.id}>
                    ₹ {prod.price}
                  </td>
                )}
              </tr>
              <tr>
                <th>In Stock</th>
                {compareProducts.map((prod) =>
                  <td key={prod.id}>
                    {prod.inStock > 0 ? "YES" : "NO"}
                  </td>
                )}
              </tr>
              <tr>
                <th>Additional Features</th>
                {compareProducts.map((prod) =>
                  <td key={prod.id}>
                    {prod?.specification?.additionalFeatures}
                  </td>
                )}
              </tr>
              <tr>
                <th>OS</th>
                {compareProducts.map((prod) =>
                  <td key={prod.id}>
                    {prod?.specification?.os}
                  </td>
                )}
              </tr>
              <tr>
                <th>Battery</th>
                {compareProducts.map((prod) =>
                  <td key={prod.id}>
                    {`${prod?.specification?.battery?.type}`}
                  </td>
                )}
              </tr>
              <tr>
                <th>5G Support</th>
                {compareProducts.map((prod) => <td
                  key={prod.id}>
                  {prod?.specification?.is5g ? "YES" : "NO"}
                </td>
                )}
              </tr>
            </tbody>
          </Table>)
          : (
            <>
              <div className='empty-comparision-container'>
                <div className='empty-comparision-btn'>
                  <Button onClick={() => handleBackToHomePage()}>Back To Home</Button>
                </div>
                <span className='empty-comparision-text'>Please select Products for comparision!</span>
              </div>
            </>
          )
      }
    </>
  )

}
