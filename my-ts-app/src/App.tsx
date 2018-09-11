import * as React from 'react';
import './App.css';

interface IConfigs {
    type: string;
    id: number;
    attributes: IAttributes;
}

interface IAttributes {
    id: number;
    key: string;
    description: string;
    defaultValue: string | null;
    sendToUI: string;
    currentValue: string | null;
}

interface IState {
    items: IConfigs[],
    value: string
}

class App extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            items: [],
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }

    public componentDidMount() {
        this.getItems();
    }

    public render() {
        return (
            <div>
                <label>
                    Filter by name:
                    <textarea value={this.state.value} onChange={this.handleChange}/>
                </label>
                <table>
                    <thead>
                    <tr>
                        <th className="name">Name</th>
                        <th className="description">Description</th>
                        <th className="description">Default</th>
                        <th className="description">Current</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.items.filter((val: any) => val.attributes.key.includes(this.state.value.toUpperCase())).map((item: any, index: any) => (
                        <tr key={index}>
                            <td className="name">{item.attributes.key}</td>
                            <td className="description">{item.attributes.description}</td>
                            <td className="description">{item.attributes.defaultValue}</td>
                            <td className="current">{item.attributes.currentValue}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                    New item: name:
                    <textarea/>
                    description:
                    <textarea/>
                    default:
                    <textarea/>
                    current:
                    <textarea/>
                    <button className='button' onClick={this.handleClick}>
                        Create new item
                    </button>
                </div>
            </div>
        );
    }

    private getItems() {
        fetch('http://localhost:1111/data')
            .then(results => results.json())
            .then(results => this.setState({'items': results}));
    }

    private handleChange(event: any) {
        this.setState({
            value: event.target.value
        });
    }

    private handleClick(event: any) {
        return;
    }
}

export default App;