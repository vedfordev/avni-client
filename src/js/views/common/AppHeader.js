import {View, StyleSheet} from "react-native";
import React, {Component} from "react";
import AbstractComponent from "../../framework/view/AbstractComponent";
import TypedTransition from "../../framework/routing/TypedTransition";
import {Button, Header, Title, Icon} from "native-base";

class AppHeader extends AbstractComponent {
    static propTypes = {
        title: React.PropTypes.string.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        //Mihir: why the icon is vertically center aligned
        return (
            <Header style={{backgroundColor: '#212121'}}>
                <Button transparent onPress={() => TypedTransition.from(this).goBack()}>
                    <Icon name='keyboard-arrow-left'/>
                </Button>
                <Title>{this.props.title}</Title>
            </Header>
        );
    }
}

export default AppHeader;