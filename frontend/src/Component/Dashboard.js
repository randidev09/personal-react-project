import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import {
	Redirect 
} from "react-router-dom";
import {Pie,Line,Bar} from 'react-chartjs-2';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: window.localStorage.getItem('isLogin'),
            pieData: {},
            barData: {},
            lineData: {}
        };
    }

    componentDidMount(props){
        axios.get(`http://localhost/api/survey`)
        .then(res => {
            let response_code = res.data.code
            if(response_code === 200){
                const dataChart = res.data.data
                const pieOri = dataChart.filter(x => x.type === 1)
                const barOri = dataChart.filter(x => x.type === 2)
                const lineOri = dataChart.filter(x => x.type === 3)
                const labelPie = []
                const valuePie = []
                const labelBar = []
                const valueBar = []
                const labelLine = []
                const valueLine = []

                let current = null;
                let cnt = 0;
                pieOri.forEach(x => {
                    if (x.response !== current) {
                        if (cnt > 0) {
                            labelPie.push(current)
                            valuePie.push(cnt)
                        }
                        current = x.response;
                        cnt = 1;
                    } else {
                        cnt++;
                    }
                })
                if (cnt > 0) {
                    labelPie.push(current)
                    valuePie.push(cnt)
                }

                current = null;
                cnt = 0;
                barOri.forEach(x => {
                    if (x.response !== current) {
                        if (cnt > 0) {
                            labelBar.push(current)
                            valueBar.push(cnt)
                        }
                        current = x.response;
                        cnt = 1;
                    } else {
                        cnt++;
                    }
                })
                if (cnt > 0) {
                    labelBar.push(current)
                    valueBar.push(cnt)
                }

                current = null;
                cnt = 0;
                lineOri.forEach(x => {
                    if (x.response !== current) {
                        if (cnt > 0) {
                            labelLine.push(current)
                            valueLine.push(cnt)
                        }
                        current = x.response;
                        cnt = 1;
                    } else {
                        cnt++;
                    }
                })
                if (cnt > 0) {
                    labelLine.push(current)
                    valueLine.push(cnt)
                }
                
                if(labelPie.length > 0){
                    this.setState({
                        pieData: {
                            labels: labelPie,
                            datasets: [
                                {
                                label: 'Best Programming Language',
                                backgroundColor: [
                                    '#B21F00',
                                    '#C9DE00',
                                    '#2FDE00',
                                    '#00A6B4',
                                    '#6800B4'
                                ],
                                hoverBackgroundColor: [
                                    '#501800',
                                    '#4B5000',
                                    '#175000',
                                    '#003350',
                                    '#35014F'
                                ],
                                data: valuePie
                                }
                            ]
                        }
                    });
                }

                if(labelBar.length > 0){
                    this.setState({
                        barData: {
                            labels: labelBar,
                            datasets: [
                                {
                                label: 'Best City',
                                backgroundColor: 'rgba(75,192,192,1)',
                                borderColor: 'rgba(0,0,0,1)',
                                borderWidth: 2,
                                data: valueBar
                                }
                            ]
                        }
                    });
                }

                if(labelLine.length > 0){
                    this.setState({
                        lineData: {
                            labels: labelLine,
                            datasets: [
                                {
                                label: 'Best Country',
                                fill: false,
                                lineTension: 0.5,
                                backgroundColor: 'rgba(75,192,192,1)',
                                borderColor: 'rgba(0,0,0,1)',
                                borderWidth: 2,
                                data: valueLine
                                }
                            ]
                        }
                    });
                }
            }
        })
    }
    
    render() {
        if(this.state.isLogin){
            return (
                <Container className="mt-5">
                    <Row>
                        <Col sm={4}>
                            <Card>
                                <Card.Body>
                                    {Object.entries(this.state.pieData).length > 0 ?
                                        <Pie
                                            data={this.state.pieData}
                                            options={{
                                                title:{
                                                    display:true,
                                                    text:'Survey of Best Programming Language',
                                                    fontSize:20
                                                },
                                                legend:{
                                                    display:true,
                                                    position:'right'
                                                }
                                            }}
                                        />
                                        : <div className="no-data-text">No data found.</div>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card>
                                <Card.Body>
                                    {Object.entries(this.state.barData).length > 0 ?
                                        <Bar
                                            data={this.state.barData}
                                            options={{
                                                title:{
                                                    display:true,
                                                    text:'Survey of Best City',
                                                    fontSize:20
                                                },
                                                legend:{
                                                    display:true,
                                                    position:'right'
                                                }
                                            }}
                                            height="300"
                                            />
                                        : <div className="no-data-text">No data found.</div>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card>
                                <Card.Body>
                                    {Object.entries(this.state.lineData).length > 0 ?
                                        <Line
                                            data={this.state.lineData}
                                            options={{
                                                title:{
                                                    display:true,
                                                    text:'Survey of Best Country',
                                                    fontSize:20
                                                },
                                                legend:{
                                                    display:true,
                                                    position:'right'
                                                }
                                            }}
                                            height="300"
                                            />
                                        : <div className="no-data-text">No data found.</div>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>            
            );
        }else{
            return(
                <Redirect to="/login" />
            )
        }
    }
}
  
export default Dashboard;
  