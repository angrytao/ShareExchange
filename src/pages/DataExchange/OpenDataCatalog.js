import { Component, Fragment } from 'react';
import st from './DataExchange.less';

class OpenDataCatalog extends Component{
    constructor(props){
        super(props);
        this.state={
            tagList:['全部','统计','交通','公安','财政','测绘']
        }
        this.handleItemSelect = this.handleItemSelect.bind(this);
    }
    
    render(){
        return (
            <Fragment>
                <div className={st.filterWarp}>
                    <label>分类：</label>
                    <ul>
                        {
                            this.state.tagList.map((item,index)=>{
                                return(
                                    <li
                                        key={index}
                                        onClick={this.handleItemSelect}
                                    >
                                    {item}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className={st.clear}></div>
                </div>
            </Fragment>
        )
    }

    handleItemSelect(){

    }
}

export default OpenDataCatalog;