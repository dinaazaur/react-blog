import React from 'react'
import DayPicker, { DateUtils } from "react-day-picker"
import 'react-day-picker/lib/style.css'
import { dateRangeSelector } from "../../selectors"
import { connect } from "react-redux"
import { onFilterDateChange } from "../../actions"

const DateFilter = ({ changeDateRange, range, range: { from, to } }) => {
  const handleDayClick = (day) => {
    changeDateRange(DateUtils.addDayToRange(day, range))
  }

  const selectedRange =
    from && to && `${from.toLocaleDateString() - to.toLocaleDateString()}`

  return (
    <DayPicker
      selectedDays={ date => DateUtils.isDayInRange(date, { from, to }) }
      onDayClick={handleDayClick}
    >
      { selectedRange }
    </DayPicker>
  )
}

export default connect(
  state => ({
    range: dateRangeSelector(state)
  }),
  { changeDateRange: onFilterDateChange }
)(DateFilter)
