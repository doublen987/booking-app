import * as React from "react";

export interface HelloProps {
    name: string;
}

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <div>Hello {this.props.name}</div>
    }
}