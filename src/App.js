import "./styles.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InputLabel from "@mui/material/InputLabel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";

export default function App() {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState([]);
  const [sortPrice, setSortPrice] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch("https://fakestoreapi.com/products")
      .then((r) => r.json())
      .then((res) => {
        setData(res);
        setOriginalData(res);
        setLoader(false);
      })
      .catch((error) => {
        setError("Oops something went wrong!");
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    let filteredData = originalData;

    if (category.length) {
      filteredData = filteredData?.filter((item) =>
        category.includes(item?.category?.toLowerCase())
      );
      setData(filteredData);
    }

    if (filter?.length > 2) {
      const text = filter;
      const filteredBytextData = filteredData?.filter((item) =>
        item?.title?.toLowerCase().startsWith(text)
      );
      setData(filteredBytextData);
    }
    if (sortPrice === "low") {
      const filteredData1 = filteredData?.sort((a, b) => b.price - a.price);
      setData(filteredData1);
    }

    if (sortPrice === "high") {
      filteredData = filteredData?.sort((a, b) => a.price - b.price);
      setData(filteredData);
    }
    if (filter?.length === 0 && category.length === 0) {
      setData(originalData);
    }
    setLoader(false);
  }, [filter, category, sortPrice]);

  const getHeader = () => {
    return (
      <header class="header">
        <div>ENIA</div>
        <div className="navHeader">
          <div>Home</div>
          <div>Women</div>
          <div>Men</div>
          <div>Smart gear</div>
          <div>Accessories</div>
        </div>
        <div>
          <LocalMallIcon />
        </div>
      </header>
    );
  };

  const getBanner = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <h1 className="bannerLeft">Men's Outerwear</h1>
          </Grid>
          <Grid item xs={12} sm={10}>
            <div className="bannerImage"></div>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const getProduct = () => {
    return data.map((item) => {
      return (
        <>
          <Grid item xs={6} sm={6} md={4}>
            <div>
              <LazyLoadImage
                className="prodictImage"
                alt={"Product img"}
                height={300}
                src={item?.image}
                width={250}
              />
            </div>
            <div className="productTitileContainer">
              <div className="productTitile">{item?.title}</div>
              <div>${item?.price}</div>
              <FavoriteBorderIcon />
            </div>
          </Grid>
        </>
      );
    });
  };

  const handleClick = (e) => {
    const { value, checked } = e.target;
    if (!category.includes(value) && checked)
      setCategory((prev) => [...prev, value]);
    if (!checked) {
      const filteredCategory = category.filter((item) => item !== value);
      setCategory(filteredCategory);
    }
    setLoader(true);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setSortPrice(value);
  };

  const getFilters = () => {
    return (
      <Box sx={{ flexGrow: 1 }} className="filterContainer">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              mb={1}
              onChange={(e) => {
                setFilter(e.target.value);
                setLoader(true);
              }}
              id="standard-basic"
              label="Filter"
              variant="standard"
            />

            <div>
              <div className="categoryFilter">
                <div>Categories</div>
                <input
                  type="checkbox"
                  id="jewellery"
                  name="Jewellery"
                  onClick={handleClick}
                  value="jewelery"
                />
                <label for="vehicle1"> Jewellery</label>
                <br />
                <input
                  type="checkbox"
                  id="electronics"
                  name="Electronics"
                  value="electronics"
                  onClick={handleClick}
                />
                <label for="vehicle2"> Electronics</label> <br />
                <input
                  type="checkbox"
                  id="menClothing"
                  name="MenClothing"
                  value="men's clothing"
                  onClick={handleClick}
                />
                <label for="vehicle3"> Men's Clothing</label>
                <br />
                <input
                  type="checkbox"
                  id="wommenClothing"
                  name="WomenClothing"
                  onClick={handleClick}
                  value="women's clothing"
                />
                <label for="vehicle3"> Womrn's Clothing</label> <br /> <br />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Grid container spacing={2}>
              {data?.length ? (
                getProduct()
              ) : (
                <div className="noResultFound">
                  <Alert sx={{ marginTop: "1rem" }} severity="error">
                    Not product found
                  </Alert>
                </div>
              )}
              {/* {getProduct()} */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // if (loader) return <div><CircularProgress /></div>;

  return (
    <div className="App">
      {getHeader()}
      {getBanner()}
      {error ? (
        <Alert sx={{ marginTop: "1rem" }} severity="error">
          {error}
        </Alert>
      ) : (
        ""
      )}
      {loader && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
      {originalData?.length ? (
        <>
          <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
            <Grid item xs={6} sm={2} md={2}>
              <div>Colths / mens / outerware</div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={10}
              md={10}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="numberOfProduct">{data?.length} results</div>
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Sort by Price
                </InputLabel>
                <Select
                  className="sortDropdown"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortPrice}
                  label="Sort by Price"
                  onChange={handleSortChange}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <section className="breadcrumb"></section>
          <section>{getFilters()}</section>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
