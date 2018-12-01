import { Component, Fragment } from 'react';
import { Steps, Icon, Input, Button,Modal } from 'antd';
import st from './PrivateDataCatalog.less';

const steps = [{
    title: '上传文件',
    content: 'First-content',
  }, {
    title: '预览数据',
    content: 'Second-content',
  }, {
    title: '完成上传',
    content: 'Last-content',
  }];

class PrivateDataCatalogInsert extends Component {
  constructor(props){
      super(props);
      this.state = {
        visible: false,
        stepCurrent:0
      }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  next() {
    const current = this.state.stepCurrent + 1;
    this.setState({ stepCurrent:current });
  }

  prev() {
    const current = this.state.stepCurrent - 1;
    this.setState({ stepCurrent:current });
  }

  render() {
    const Step = Steps.Step;
    return (
      <Fragment>
          <Button type="primary" onClick={this.showModal}>导入数据</Button>
          <Modal
            visible={this.state.visible}
            title="导入数据"
            width='800px'
            onCancel={this.handleCancel}
            footer=""
          >
            <Steps size="small" current={this.state.stepCurrent}>
                {steps.map(item => <Step key = {item.title} title = {item.title}/>)}
            </Steps>
            <div className={st.steps-content}>{steps[this.state.stepCurrent].content}</div>
            <div className={st.steps-action}>
                {
                    this.state.stepCurrent < steps.length - 1
                    && <Button type="primary" onClick={() => this.next()}>Next</Button>
                }
                {
                    this.state.stepCurrent === steps.length - 1
                    && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                }
                {
                    this.state.stepCurrent > 0
                    && (
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    Previous
                    </Button>
                    )
                }
            </div>
          </Modal>
      </Fragment>
    )
  }
}


export default PrivateDataCatalogInsert;