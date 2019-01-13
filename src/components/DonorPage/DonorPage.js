import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, Intent, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import produce from 'immer'
import NewCategory from './NewCategory'


class DonorPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            isCategoriesOpen: false,
            selection: ''
        }
    }

    componentDidMount() {
        this.setState({
            categories: []
        })
    }

    addCategory = (newCategory) => {
        this.setState(
            produce(draft => {
                draft.categories.push(newCategory)
            })
        )
    };

    handleClick = (event) => {
        this.setState({
          selection: event.target.textContent,
          isCategoriesOpen: !this.state.isCategoriesOpen })
      }
    
      handleCategoriesOpen = () => {
        this.setState({ isCategoriesOpen: !this.state.isCategoriesOpen })
      }

    render() {
        const DonorSelectMenu = (
          <Menu>
              <MenuItem text="Add A New Category" onClick={this.handleClick}/>
              <MenuItem text="Add A New Pickup Detail" onClick={this.handleClick}/>
              <MenuItem text="Add A New Item Restriction" onClick={this.handleClick}/>
          </Menu>
      );
        return (
          <Container>
            <H3>Design The Donor Page</H3>
            <ButtonRow>
              <Popover content={DonorSelectMenu} position={Position.RIGHT}>
                <Button intent={Intent.PRIMARY}>Add A New ...</Button>
              </Popover>
            </ButtonRow>
            <NewCategory addCategory={this.addCategory}
                         isOpen={this.state.isCategoriesOpen}
                         handleClose={this.handleCategoriesOpen}
                         selection={this.state.selection}
            />
          </Container>
        );
      }
}




const Container = styled.div`
  margin: 25px;
`

const ButtonRow = styled.div`
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
`  

export default DonorPage;