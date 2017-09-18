import React, { Component } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react/native';
import { TabBar, TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view';
import { StyleSheet } from 'react-native';

import Layout from '../../shared/components/Layout';
import ProjectsTimeline from './ProjectsTimeline';
import ProjectsList from './ProjectsList';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

@observer
export default class Projects extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            routes: [
                { key: '1', title: 'Listing' },
                { key: '2', title: 'Overview' },
            ],
        };

    }

    _handleChangeTab = (index) => {
        this.setState({ index });
    };

    _renderFooter = (props) => {
        return <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: 'white',
            }}
            style={{
                backgroundColor: '#233445',
                height: 50,
            }}
            labelStyle={{
                fontSize: 14,
            }}

        />;
    };

    _renderScene = ({ route }) => {
        const { store: { ui, session, projects: projectsStore } } = this.props;
        const { year: scolarYear } = session.userProfile;

        switch (route.key) {
            case '1':
                return <ProjectsList uiStore={ui} projectsStore={projectsStore} />;
            case '2':
                return <ProjectsTimeline
                    projectsStore={projectsStore}
                    momentStart={moment().year(scolarYear).month('Sep').startOf('month')}
                    momentEnd={moment().year(scolarYear).month('Sep').add(1, 'year').add(1, 'month').startOf('month')}
                />;
            default:
                return null;
        }
    };

    _renderPager = (props) => {
        return <TabViewPagerPan {...props} swipeEnabled={false} />;

    };

    render() {
        return (
            <Layout store={this.props.store}>
                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderFooter={this._renderFooter}
                    renderPager={this._renderPager}
                    onRequestChangeTab={this._handleChangeTab}
                />
            </Layout>
        );
    }
}