import{ Component, ReactNode } from 'react';

import "./Header.css";

interface HeaderProps {
    children?: ReactNode;
}

export class Header extends Component<HeaderProps> {
    public render() {
        return (
            <div className="Header">
                <div className='Header-Text'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Header;
