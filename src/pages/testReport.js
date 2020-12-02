import React, { Component } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import scrollToComponent from 'react-scroll-to-component';
import "../App.css";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";
import jgLogo from '../assets/img/icon.png';

class testReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [
        { name: "Keanu Reeves", profession: "Actor",test1:"test1",test2:"test2",test3:"test3",test4:"test4",test5:"test5",test6:"test6" },
        { name: "Lionel Messi", profession: "Football Player",test1:"test1",test2:"test2",test3:"test3",test4:"test4",test5:"test5",test6:"test6" },
        { name: "Cristiano Ronaldo", profession: "Football Player",test1:"test1",test2:"test2",test3:"test3",test4:"test4",test5:"test5",test6:"test6" },
        { name: "Jack Nicklaus", profession: "Golf Player",test1:"test1",test2:"test2",test3:"test3",test4:"test4",test5:"test5",test6:"test6" },
      ],
    };
  }
  generatePdf = ()=>{
    const doc = new jsPDF('p','pt','a4');
    doc.setProperties({
      title: "This is my title"
    });
    doc.setFont('Arial', '')
    doc.setFontSize(30)
    let text = 'Hi How are you'
    let xcenterPotiotion = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(text) * doc.internal.getFontSize() / 2);
    doc.addImage(jgLogo, 'PNG', 0, 0, 100, 100);
    doc.text('Purchase order', xcenterPotiotion, 50);
    doc.setFont('Arial', '')
    doc.setFontSize(10)
    doc.text(text, 10, 100);
    doc.text(text, 140, 100);
    doc.text(text, 280, 100);
    doc.text(text, 420, 100);
    doc.addPage();
    var generateData = function(amount) {
      var result = [];
      var data = {
        coin: "100",
        game_group: "GameGroup",
        game_name: "XPTO2",
        game_version: "25",
        machine: "20485861",
        vlt: "0"
      };
      for (var i = 0; i < amount; i += 1) {
        data.id = (i + 1).toString();
        result.push(Object.assign({}, data));
      }
      return result;
    };
    
    function createHeaders(keys) {
      var result = [];
      for (var i = 0; i < keys.length; i += 1) {
        result.push({
          id: keys[i],
          name: keys[i],
          prompt: keys[i],
          width: 250,
          align: "center",
          padding: 0
        });
      }
      return result;
    }
    
    var headers = createHeaders([
      "id",
      "coin",
      "game_group",
      "game_name",
      "game_version",
      "machine",
      "vlt"
    ]);
    doc.table(1, 1, generateData(100), headers);
    //top left
    doc.text("*", 1, 10);
    doc.text("*", 5, 10);
    //top right
    doc.text("*", 585, 10);
    doc.text("*", 589, 10);
    //bottom left
    doc.text("*", 1, 842);
    doc.text("*", 5, 842);
    //bottom right
    doc.text("*", 585, 842);
    doc.text("*", 589, 842);
    window.open(doc.output('bloburi'), '_blank');
  }
  render() {
    return (
      <div id="divid">
        <button className="my-btn full-widht" onClick={() => this.generatePdf()}>
          Generate pdf
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    aksespage: state.reducer.aksespage,
    userinfo: state.reducer.userinfo
  };
};

export default withRouter(connect(mapStateToProps)(testReportPage));