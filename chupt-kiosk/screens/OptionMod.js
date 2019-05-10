import React from 'react'
import { Text, View, FlatList, CheckBox } from 'react-native'
import { toggleChecked } from '../kioskActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import Txt from '../components/Txt'

class OptionMod extends React.Component {
  render () {
    const options = this.props.data.option
    const itemID = this.props.id
    const checked = this.props.checked.find(x => x.id === itemID)

    if (!checked) {
      return null
    } else {
      switch (this.props.mealType) {
        case 'single':
          return (
            <View>
              <Txt big>Options</Txt>
              <FlatList
                style={{ marginLeft: 20 }}
                data={options}
                extraData={checked}
                renderItem={({ item }) => {
                  return (
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <CheckBox
                        value={(/true/i).test(checked.options.find(x => x.name === item.name).value)}
                        onValueChange={() => this.props.toggleChecked(itemID, 'options', item.name)}
                      />
                      <Text>{item.name}</Text>
                    </View>)
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )
        case 'multi':
          const multiItem = checked.items.find(x => x.id === this.props.item.item.item_id)
          if (multiItem) {
            return (
              <View>
                <Txt big>Options</Txt>
                <FlatList
                  style={{ marginLeft: 20 }}
                  data={options}
                  extraData={checked}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <CheckBox
                          value={(/true/i).test(multiItem.options.find(x => x.name === item.name).value)}
                          onValueChange={() => this.props.toggleChecked(itemID, item.name, 'options', multiItem.id, 'filler')}
                        />
                        <Text>{item.name}</Text>
                      </View>)
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )
          } else {
            return (
              null
            )
          }
      }
    }
  }
}

function mapStateToProps (state) {
  return {
    menu: state.menu,
    checked: state.checked
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    toggleChecked
  }, dispatch)
)

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionMod))
