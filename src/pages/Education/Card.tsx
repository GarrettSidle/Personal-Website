import React, { PureComponent } from "react";
import { Component } from "react";

import "./Card.css";

interface DataTableProps {
  description: string;
  header: string;
  image: ImageBitmap;
  subHeader: string;
  dates: string;
}

export class Card extends PureComponent<DataTableProps> {
  public render() {
    return (
      <div className="Card">
        <div className="Card-Logo">
          <img src="Northwest.png" />
        </div>
        <div className="Card-Header">{this.props.header}</div>
        <div className="Card-SubHeader">{this.props.subHeader}</div>
        
        <div className="Card-Dates">{this.props.dates}</div>
        <div className="Card-Desc">{this.props.description}</div>
      </div>
    );
  }
}
export default Card;
