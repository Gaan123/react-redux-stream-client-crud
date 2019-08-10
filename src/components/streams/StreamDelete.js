import React from 'react';
import Modal from '../Modal';
import {connect} from 'react-redux';
import history from '../../history'
import {fetchStream,deleteStream} from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }


    renderAction() {
        return (
            <>
                <button className="ui button negative" onClick={()=>this.props.deleteStream(this.props.match.params.id)}>
                    Delete
                </button>
                <button className="ui button" onClick={() => history.push('/')}>
                    Cancel
                </button>
            </>)
    };

    renderContent() {
        if (!this.props.stream) {
            return "Are you sure you want a delete this stream?"
        }
        return `Are you sure you want a delete ${this.props.stream.title} stream?`
    }

    render() {

        return (
            <Modal title="Delete Stream"
                   content={this.renderContent()}
                   actions={this.renderAction()}
                   onDismiss={() => history.push('/')}
            />
        )
    }


}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
};
export default connect(mapStateToProps, {fetchStream,deleteStream})(StreamDelete);