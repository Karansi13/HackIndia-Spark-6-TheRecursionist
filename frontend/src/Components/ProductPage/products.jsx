import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import Productcard from "../Product-card/Productcard.jsx"; // Adjust the path as needed
import { NFT__DATA } from '../../assets/data/data.js'; // Adjust path as necessary
import './products.css';

export const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [course, setCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  useEffect(() => {
    // Set the course data from imported dummy data
    setCourse(NFT__DATA);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term state
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Filter products based on category, price, and search term
  const filteredProducts = course
    .filter(item =>
      (!selectedCategory || item.category === selectedCategory) &&
      (!minPrice || item.price >= parseFloat(minPrice)) &&
      (!maxPrice || item.price <= parseFloat(maxPrice)) &&
      (!searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  // Pagination
  const offset = currentPage * itemsPerPage;
  const currentProducts = filteredProducts.slice(offset, offset + itemsPerPage);

  return (
    <>
      <Navbar />

      <div className="container my-5 marketplace">
        <div className="row mt-lg-5">
          <div className="col-12 mb-3">
            <h5>Products</h5>
            <p className="small">Find Items According to your needs!</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-3 mb-3">
            <p className="text-muted small mb-2">Search</p>
            <form id="formFilter" method="get" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="search"
                  aria-label="search-input"
                  placeholder="Find according to the category"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="input-group-append">
                  <button
                    className="input-group-text bg-white"
                    id="search-addon"
                    type="button"
                    onClick={() => setCurrentPage(0)} // Reset to first page on search
                  >
                    <Icon.Search />
                  </button>
                </div>
              </div>
            </form>
            <div className="text-muted small mb-2">Categories</div>
            <div className="ml-2">
              <Form>
                <Form.Check
                  type="radio"
                  label="Maintenance"
                  name="radioOption"
                  value="option1"
                  onChange={() => handleCategorySelect("Maintenance")}
                />
                <Form.Check
                  type="radio"
                  label="Construction"
                  name="radioOption"
                  value="option2"
                  onChange={() => handleCategorySelect("Construction")}
                />
                <Form.Check
                  type="radio"
                  label="Cleaning"
                  name="radioOption"
                  value="option3"
                  onChange={() => handleCategorySelect("Cleaning")}
                />
                <Form.Check
                  type="radio"
                  label="All Items"
                  name="radioOption"
                  value="option4"
                  onChange={() => handleCategorySelect(null)}
                />
              </Form>
            </div>

            <div>
              <Form.Group className="mt-2">
                <Form.Label className="text-muted small">Price</Form.Label>
                <div>
                  <InputGroup className="mb-2">
                    <InputGroup.Text>ETH</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Minimum ETH Price"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputGroup.Text>ETH</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Maximum ETH Price"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                    />
                  </InputGroup>
                </div>
              </Form.Group>
            </div>
          </div>

          <div className="col">
            <section className="row">
              {currentProducts.map((item) => (
                <div key={item.id} className="col-6 col-lg-4 mb-3 grid-template-columns-repeat">
                  <Productcard item={item} />
                </div>
              ))}
            </section>
            
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              previousClassName={"previous"}
              nextClassName={"next"}
              disabledClassName={"disabled"}
            />
          </div>
        </div>
      </div>

      <div className="container my-5 marketplace">
        <div className="row mt-lg-5">
          <div className="col-12 mb-3">
              <Footer/>
          </div>
        </div>
      </div>

    </>
  );
};

export default Marketplace;
