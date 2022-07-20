import React, { PureComponent } from 'react'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class KeyboardScroll extends PureComponent {
    constructor(props) {
        super(props); 
    }

    render() {
        return (
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                {...this.props}
            >
                {this.props.children}
            </KeyboardAwareScrollView>
        );
    }
}
