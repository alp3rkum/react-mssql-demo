/* Footer of the page */

import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

export default class Footer extends Component {
  render() {
    return (
      <div className='div-footer'>
        <hr/>
        <Row className='footer'>
            <Col xs={3} className='credit'>
                <p className='credit-p'>Made by Alper Kum, 2024</p>
            </Col>
            <Col className='powered-by'>
                <p>Powered by <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/800px-React-icon.svg.png" width="57" height="50" title="React JS" alt="React JS"/>
                <img src="https://cdn.syncfusion.com/content/images/Logo/Logo_150dpi.png" width="223" height="50" title="Syncfusion Essential Studio (React)" alt='Syncfusion Essential Studio (React)'/>
                <img src="https://www.pinclipart.com/picdir/big/554-5548691_microsoft-sql-server-logo-png-sql-server-logo.png" width="62" height="50" title="MS SQL Server" alt='MS SQL Server'/>
                <img src="https://wsofter.com/wp-content/uploads/2017/12/node-express.png" width="50" height="50" title="Node Express.JS" alt='Node Express.JS'/>
                {/* Small logo images of the technologies that powers the application */}
                </p>
            </Col>
        </Row>
      </div>
    )
  }
}
