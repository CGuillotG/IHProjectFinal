import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
let productsURL = 'http://localhost:3000/products/'


export default class Search extends React.Component {
  state = {
    products: [],
    searchProducts:[],
    searchterm:''
  }

  changeSearch = e => {
    let {products} = this.state
    let searchterm = e.target.value.toLowerCase()
    let searchProducts =  products.filter((elem, index)=> elem.title.toLowerCase().includes(searchterm) )
    this.setState({searchProducts, searchterm})
  }

  componentDidMount = () => {
    let searchterm = ''
    if(this.props.location.search !== '') {
      searchterm = this.props.location.search.split('=')[1]
    }
    axios.get(productsURL)
    .then(res => {
      let products = res.data
      let searchProducts = products.filter((elem, index)=> elem.title.toLowerCase().includes(searchterm) )
      this.setState({ products, searchterm, searchProducts })
    })
  }
  render() {
    let {searchProducts, searchterm} = this.state
    return (
      <div>
        <h2>Busqueda de Productos en Renta</h2>
        <input onChange={this.changeSearch} type="search" name="searchbar" id="searchbar" placeholder="¿Qué quieres rentar?" value={searchterm}/>
        <div style={{display:"flex", flexWrap:"wrap"}}>
          {searchProducts.map((product,index)=>{
              return(
                <div key={index}>
                  <Link to={`/producto/${product._id}`}>
                    <img src={product.productPics[0]} alt="Producto" height="150"/>
                  </Link>
                  <br/>
                  <img src={product.lessor[0].profilePic} alt="Arrendador" height="50" style={{"borderRadius":"50%"}}/>
                  <p>{product.lessor[0].username}</p>
                  <Link to={`/producto/${product._id}`}>
                    <h3>{product.title}</h3>
                  </Link>
                  <p>{product.area}</p>
                  <p>desde</p>
                  <h4>${product.rentDay7} por día</h4>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}
