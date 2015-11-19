import _ from 'lodash'


export default class {

  constructor(y,m,d,h=0,mm=0) {
    this.months = ["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sep", "oct", "nov", "dec"];

    if (!y) {
      let now = new Date()
      y = now.getFullYear()
      m = this.months[now.getMonth()]
    }

    if (typeof Number(m) === 'number')
      m = this.months[m]
    this.changeDate(y,m,d,h,mm)
  }

  changeDate(y,m,d,h,mm) {
    if (typeof m === 'number')
      m = this.months[m]
    this.date = this.linkHelper(y,m,d,h,mm)
  }

  getEvents(line, events, withHour=false) {
    return events.filter((evt) => {
      let {start, end} = this.getLimit(line, evt, withHour)
      if (start && end) {
        evt.cell = {start: start.col, end: end.col}
        return evt;
      }
    })
  }

  matrix(view='month') {
    let {y,m,d} = this.date
    var {rows, cols} = this.getRange(6,7)
      , {start, next, date} = this.getDates()
      , days = next.getDate()
      , months = []
      , weeks
      , day
      , tmp
      , currentWeek
      , cellDate

    _.each(rows, (row) => {
      weeks = [];
      _.each(cols, (col) => {
        if (row === 0) {
          day = col - start.getDay() + 1
          tmp = (col < start.getDay()
              ? -(new Date(y, m, -(start.getDay() - 1 - col)).getDate())
              : day)
        } else {
          day = _.last(months)[6].day + col + 1
          tmp = (day <= days ? day : -(day - days))
        }
        let monthTmp = m
        if (tmp < -20)
          monthTmp -= 1
        else if (tmp < 0)
          monthTmp += 1
        cellDate = new Date(y, monthTmp , Math.abs(tmp))

        weeks.push({
          date: cellDate,
          day: tmp,
          week: cellDate.getWeek(),
          month: cellDate.getMonth(),
          year: y,
          col: col,
          row: row
        })

      });
      if (view === 'week' && cellDate.getWeek() === date.getWeek() && !currentWeek)
        currentWeek = weeks

      if (!row || weeks[0].day > 0)
        months.push(weeks)

    });

    if (currentWeek) {
      let weekHour = []
      _.each(currentWeek, (item) => {
        let dayHour = []
        _.range(0, 24).map((hour) => {
          dayHour.push(_.assign({}, item, {hour}, {col: hour}, {date: new Date(item.year, item.month , Math.abs(item.day), hour)}))
        })
        weekHour.push(dayHour)
      })
      return weekHour;
    }
    return months;
  }

  getRange(rows, cols) {
    return {
      rows: _.range(0, rows),
      cols: _.range(0, cols)
    }
  }

  getDates() {
    return {
      start: new Date(this.date.y, this.date.m),
      next: new Date(this.date.y, this.date.m + 1, 0),
      date: new Date(this.date.y, this.date.m, this.date.d)
    }
  }

  getToday(withDay) {
    let today = new Date()
    if (withDay)
      return this.linkHelper(today.getFullYear(), today.getMonth(), today.getDate());
    else
      return this.linkHelper(today.getFullYear(), today.getMonth());
  }

  getInfo() {
    let info = new Date(this.date.y, this.date.m)
    return this.linkHelper(info.getFullYear(), info.getMonth())
  }

  getLink(view) {
    let {previous, next, today, current} = this.getLinkHelper(view)

    let prevLink = `/${view}/${previous.y}/${previous.m}`
      , nextLink = `/${view}/${next.y}/${next.m}`
      , todayLink = `/${view}/${today.y}/${today.m}`
      , monthLink = `/month/${current.y}/${current.m}`
      , weekLink = `/week/${current.y}/${current.m}/2`

    if (view === 'week') {
      prevLink += `/${previous.d}`
      nextLink += `/${next.d}`
      todayLink += `/${today.d}`
    }
    return {prevLink, nextLink, todayLink, monthLink, weekLink}
  }

  getLinkHelper(view) {
    let y = this.date.y
      , m = this.date.m * 1
      , d = this.date.d * 1
      , h = this.date.h
      , mm = this.date.mm

    if (view === 'week') {
      let nt = new Date(y, m, d + 7)
        , pv = new Date(y, m, d - 7)

      return {
        next: this.linkHelper(nt.getFullYear(), nt.getMonth(), nt.getDate()),
        previous: this.linkHelper(pv.getFullYear(), pv.getMonth(), pv.getDate()),
        today: this.getToday(true),
        current: this.linkHelper(y,m,d,h,mm)
      }
    } else {

      let nt = new Date(y, m + 1)
        , pv = new Date(y, m - 1)

      return {
        next: this.linkHelper(nt.getFullYear(), nt.getMonth()),
        previous: this.linkHelper(pv.getFullYear(), pv.getMonth()),
        today: this.getToday(),
        current: this.linkHelper(y,m,d,h,mm)
      }
    }

  }

  getLimit(line, evt, withHour) {
    let eventDate = {
      start: new Date(evt.start),
      end: new Date(evt.end)
    }
    let start = _.find(line, (item) => {
      return this.compare(item.date, eventDate.start, withHour)
    });

    let end = _.find(line, (item) => {
      return this.compare(item.date, eventDate.end, withHour)
    });

    if ( !(start || end || (line[0].date > eventDate.start && line[line.length-1].date < eventDate.end)) )
      return {start, end}

    if (!start) start = line[0];
    if (!end) end = line[line.length-1];

    return {start, end}
  }

  compare(date1, date2, withHour) {
    if (withHour)
      return this.compareWithHour(date1, date2);
    return this.compareDate(date1, date2)
  }

  compareWithHour(date1, date2) {
    return date1.getHours() === date2.getHours()
        && this.compareDate(date1, date2)
  }

  compareDate(date1, date2) {
    return date1.getDate() === date2.getDate()
        && date1.getMonth() === date2.getMonth()
        && date1.getFullYear() === date2.getFullYear()
  }

  linkHelper(y, m, d, h=0, mm=0) {
    let mo = m*1
    if (mo >= -1) {
      if (mo == -1) {
        mo = 11;
        y--;
      } else if (mo == 12) {
        mo = 0;
        y++;
      }
      m = this.months[mo];
    } else {
      m = this.months.indexOf(m);
    }
    return {y, m, d, h, mm, month: this.months.indexOf(m)};
  }

}

//
//
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  var week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
         - 3 + (week1.getDay() + 6) % 7) / 7);
}
