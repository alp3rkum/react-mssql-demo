/* Landing page
Standard FETCH API version */

import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import {ColumnsDirective, ColumnDirective, GridComponent} from '@syncfusion/ej2-react-grids';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

import './grid.css';

export default function Landing() {
  const location = useLocation();
  const user = location.state.user;

  const [apiData, setApiData] = useState([]); //necessary state assignments that will be used by the component
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('p.id');
  const [desc, setDesc] = useState('ASC');
  const [totalDataCount, setTotalCount] = useState(0);
  const dataUrlMain = 'http://localhost:5000/api/products';
  const countUrl = 'http://localhost:5000/api/products/count'; //to get the count of the datas, for enchancing pagination

  const constructDataUrl = (page, order, desc) => {
    return `${dataUrlMain}/order=${order}%20${desc}/page=${page}`; //constructs the main data URL according to the state variables
  };

  const fetchData = async () => {
    try
    {
      if(totalDataCount === 0) //only when the page loads for the first time, so it doesn't have to get counts again
      {
        const countResponse = await fetch(countUrl); //gets the data count first to enhance the pagination
        if(!countResponse.ok){
          throw new Error(`Failed to fetch data. Server returned ${countResponse.status} ${countResponse.statusText}`);
        }
        const countData = await countResponse.json();
        setTotalCount(countData[0]["Column0"]);
      }
      
      
      const dataUrl = constructDataUrl(page, order, desc); //then gets the data
      const response = await fetch(dataUrl);
      if(!response.ok){
        throw new Error(`Failed to fetch data. Server returned ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setApiData(data);
    }
    catch(error)
    {
      console.error('Error fetching data: ',error);
    }
  }

  useEffect(() => { //immediately gets the data as the page loads
    fetchData()
  }, [page,order,desc]);

  const handleClick = (isNext) => { //pagination click
    setPage(prevPage => isNext ? prevPage + 1 : Math.max(prevPage - 1, 1));
    fetchData();
  };

  const handleSelect = (e) => { //sorting according to columns
    setOrder(e.target.value);
    fetchData();
  }

  const handleCheck = (e) => { //change in the checkbox of ascending or descending sorting
    setDesc(e.target.checked ? 'DESC' : 'ASC');
    fetchData();
  }

  return (
    <div className='landing-div'>
      <div id='sub-header'>
        <h3>Welcome, {user.first_name} {user.last_name}!</h3>
      </div>
      <h4>Data Grid</h4>
      <div className='sort-div form-group row'>
        <div className='col-auto'>
          <label>Sort By: </label>
        </div>
        <div className='col-auto'>
          <select className="form-select" id='order' onChange={handleSelect}>
            <option value={'p.id'}>ID</option>
            <option value={'p.product_name'}>Product Name</option>
            <option value={'pc.category_name'}>Category</option>
            <option value={'p.product_price'}>Price</option>
            <option value={'p.product_quantity'}>Quantity</option>
          </select>
        </div>
        <div className='col-auto'>
          {/* <CheckBox label='Descending' /> */} {/*render method didn't extend React.Component*/}
          <input type='checkbox' value="desc" id='desc' onChange={handleCheck}/> Descending Order 
        </div>
      </div>
      <GridComponent dataSource={apiData} cssClass='e-grid'> {/* Here comes the Syncfusion Data Grid component */}
        <ColumnsDirective>
          <ColumnDirective field='id' headerText='Product ID' />
          <ColumnDirective field='product_name' headerText='Product Name'  />
          <ColumnDirective field='category_name' headerText='Category' />
          <ColumnDirective field='product_price' headerText='Price' format='#,##0.00₺' />
          <ColumnDirective field='product_quantity' headerText='Quantity' />
        </ColumnsDirective>
      </GridComponent>
      <div className='text-center button-div'>
        <ButtonComponent disabled={page === 1} content='<' onClick={() => {handleClick(false);}} /> {/* Here comes the Syncfusion Button component to enhance the usage of Syncfusion components */}
        <ButtonComponent disabled={(10*parseInt(page)) > totalDataCount} content='>' onClick={() => {handleClick(true);}} />
      </div>
      
    </div>
  )
}
