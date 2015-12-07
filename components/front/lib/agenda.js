import _ from 'lodash'


export default class {

  constructor(y,m,d,h=0,mm=0) {
    this.months = ["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sep", "oct", "nov", "dec"];
    this.days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.except = [];
    if (!y) {
      let now = new Date()
      y = now.getFullYear()
      m = this.months[now.getMonth()]
    }
    this.changeDate(y,m,d,h,mm)
  }

  setException(except) {
    this.except = except;
  }

  changeDate(y,m,d,h,mm) {
    if (typeof m === 'number') m = this.months[m]
    this.date = this.linkHelper(y,m,d,h,mm)
  }

  getEvents(line, events, withHour=false, withMinute=false) {
    let allevents = events.filter( evt  => {
      let {start, end} = this.getLimit(line, evt, withHour, withMinute)
      if (start && end) {
        evt.cell = {start: start.col, end: end.col}
        return evt;
      }
    })
    if (allevents.length === 0) return allevents

    return allevents
      .sort( (a, b) => b.room.id - a.room.id )
      // .sort( (a, b) => b.cell.start - a.cell.start )
      .sort( (a, b) => b.cell.end - b.cell.start - (a.cell.end - a.cell.start) )
      // .sort( (a, b) => b.room.id - a.room.id )
  }

  getEventsByDate(date, events, withHour=false, withMinute=false) {
    return events.filter( evt  => this.compare(date, new Date(evt.start), withHour, withMinute) || this.compare(date, new Date(evt.end), withHour, withMinute) || (date >= new Date(evt.start) && date <= new Date(evt.end)) )
  }

  tetris(events) {
    if (events.length===0)
      return [];
    events[0].cell.line = 1;

    for (let j=0,len=events.length; j<len; j++) {
      let collision = false
        , evt = events[j].cell
        , line = 1;
      while(!evt.line) {
        let evts = events.filter(a => { if (a.cell.line === line) return a; });
        for(let i=0,len=evts.length; i<len; i++) {
          let c = evts[i].cell
          if ( evt.start >= c.start && evt.start <= c.end || evt.end >= c.start && evt.end <= c.end)
            collision = true;
        }
        if (collision) {
          collision = false;
          line++;
        } else {
          evt.line = line
        }
      }
    }
    return events
  }

  matrix(view='month') {
    let {y,month,d,h,mm} = this.date
    var {rows, cols} = this.getRange(6,7)
      , {start, next, date} = this.getInitDates()
      , days = next.getDate()
      , months = []
      , weeks
      , day
      , tmp
      , commonCell
      , currentWeek
      , currentDay
      , cellDate
    _.each(rows, (row) => {
      weeks = [];
      _.each(cols, (col) => {
        if (row === 0) {
          day = col - start.getDay() + 1
          tmp = (col < start.getDay()
              ? -(new Date(y, month, -(start.getDay() - 1 - col)).getDate())
              : day)
        } else {
          day = _.last(months)[6].day + col + 1
          tmp = (day <= days ? day : -(day - days))
        }
        //adjust month and year
        let yearTmp = Number(y)
          , monthTmp = Number(month)
        if (tmp < -20) monthTmp -= 1
        else if (tmp < 0) monthTmp += 1
        if (monthTmp < 0) {
          monthTmp = 11;
          yearTmp -= 1;
        } else if (monthTmp > 11) {
          monthTmp = 0;
          yearTmp += 1;
        }
        cellDate = new Date(yearTmp, monthTmp , Math.abs(tmp), h)
        commonCell = {
          date: cellDate,
          day: tmp,
          week: cellDate.getWeek(),
          month: cellDate.getMonth(),
          monthName: this.months[cellDate.getMonth()],
          year: cellDate.getFullYear(),
          disabled: this.checkExcept(cellDate, view)
        }
        weeks.push(_.extend({col, row}, commonCell))
        if (view === 'day' && cellDate.getWeek() === date.getWeek() && cellDate.getDate() === date.getDate() && !currentDay)
          currentDay = commonCell
      });
      if (view === 'week' && cellDate.getWeek() === date.getWeek() && !currentWeek)
        currentWeek = weeks
      if (!row || weeks[0].day > 0) months.push(weeks)
    });

    if (currentDay) {
      let dayHour = []
      _.range(0, 24).map((hour) => {

        _.range(0, 4).map((quart) => {
          let minute = quart * 15
          let date = new Date(currentDay.year, currentDay.month , Math.abs(currentDay.day), hour, minute)
            , check = this.checkExcept(date, view)
          dayHour.push(_.assign({}, currentDay, {hour}, {minute}, {col: dayHour.length}, {date}, {disabled: check}))
        })
      })
      return dayHour;
    } else if (currentWeek) {
      let weekHour = []
      _.each(currentWeek, (item) => {
        let dayHour = []
        _.range(0, 24).map((hour) => {

          _.range(0, 4).map((quart) => {
            let minute = quart * 15
            let date = new Date(item.year, item.month , Math.abs(item.day), hour, minute)
              , check = this.checkExcept(date, view)
            dayHour.push(_.assign({}, item, {hour}, {minute}, {col: dayHour.length}, {date}, {disabled: check}))
          })

        })
        weekHour.push(dayHour)
      })
      return weekHour;
    }
    return months;
  }

  checkExcept(date, view) {
    var ret = false;
    for(let i=0, len=this.except.length; i<len; i++) {
      switch(typeof this.except[i]) {
        case 'string':
          if (date.getDay() === this.days.indexOf(this.except[i]))
            ret = true;
          break;
        case 'object':
          switch(typeof this.except[i].start) {
            case 'number':
              if (view !== 'month' && date.getHours() >= this.except[i].start && date.getHours() <= this.except[i].end)
                ret = true;
              break;
            case 'object':
              if (date >= this.except[i].start && date <= this.except[i].end)
                ret = true;
              break;
            default:
              if (view === 'month' && date.toString() === this.except[i].toString())
                ret = true;
              else if(view !== 'month') {
                let tmp = new Date(date.getFullYear(), date.getMonth(), date.getDate())
                if( tmp.toString() === this.except[i].toString())
                  ret = true;
              }
              break;
          }
          if (date.getDay() === this.days.indexOf(this.except[i]))
            ret = true;
          break;
        default:
          if (date.toString() === this.except[i].toString())
            ret = true;
          break;
      }
    }
    return ret;
  }

  getRange(rows, cols) {
    return {
      rows: _.range(0, rows),
      cols: _.range(0, cols)
    }
  }

  getInitDates() {
    return {
      start: new Date(this.date.y, this.date.month),
      next: new Date(this.date.y, this.date.month + 1, 0),
      date: new Date(this.date.y, this.date.month, this.date.d)
    }
  }

  getDays() {
    return this.days;
  }

  getToday(withDay) {
    let today = new Date()
    return this.linkHelper(today.getFullYear(), today.getMonth(), withDay ? today.getDate() : null);
  }

  getInfo() {
    let info = new Date(this.date.y, this.date.month, this.date.d)
    return this.linkHelper(info.getFullYear(), info.getMonth(), info.getDate())
  }

  getLink(view) {
    let {previous, next, today, current} = this.getLinkHelper(view)
      , prevLink = `/${view}/${previous.y}/${previous.m}`
      , nextLink = `/${view}/${next.y}/${next.m}`
      , todayLink = `/${view}/${today.y}/${today.m}`
      , monthLink = `/month/${current.y}/${current.m}`
      , weekLink = `/week/${current.y}/${current.m}/15`
      , dayLink = `/day/${current.y}/${current.m}/15`
    if (view === 'week' || view === 'day') {
      prevLink += `/${previous.d}`
      nextLink += `/${next.d}`
      todayLink += `/${today.d}`
    }
    return {prevLink, nextLink, todayLink, dayLink, monthLink, weekLink}
  }

  getLinkHelper(view) {
    let y = this.date.y
      , m = this.date.month * 1
      , d = this.date.d * 1
      , h = this.date.h
      , mm = this.date.mm
    if (view === 'week' || view === 'day') {
      let nt = new Date(y, m, d + (view === 'week' ? 7 : 1))
        , pv = new Date(y, m, d - (view === 'week' ? 7 : 1))
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

  getLimit(line, evt, withHour, withMinute) {
    let eventDate = {
      start: new Date(evt.start),
      end: new Date(evt.end)
    }
    let start = _.find(line, item => this.compare(item.date, eventDate.start, withHour, withMinute));
    let end = _.find(line, item => this.compare(item.date, eventDate.end, withHour, withMinute));
    if ( !(start || end || (line[0].date > eventDate.start && line[line.length-1].date < eventDate.end)) )
      return {start, end}
    if (!start) start = line[0];
    if (!end) end = line[line.length-1];
    return {start, end}
  }

  compare(date1, date2, withHour, withMinute) {
    if (withMinute)
      return this.compareWithMinute(date1, date2);
    else if (withHour)
      return this.compareWithHour(date1, date2);
    return this.compareDate(date1, date2)
  }
  compareWithMinute(date1, date2) {
    return date1.getMinutes() === date2.getMinutes() && this.compareWithHour(date1, date2)
  }
  compareWithHour(date1, date2) {
    return date1.getHours() === date2.getHours() && this.compareDate(date1, date2)
  }
  compareDate(date1, date2) {
    return date1.getDate() === date2.getDate()
        && date1.getMonth() === date2.getMonth()
        && date1.getFullYear() === date2.getFullYear()
  }

  linkHelper(y, m, d, h=0, mm=0) {
    let month;//number
    if (typeof m === 'string')
      month = this.months.indexOf(m)
    else {
      month = m;
      m = this.months[month]
    }
    if (m == -1) {
      month = 11;
      y--;
    } else if (month == 12) {
      month = 0;
      y++;
    }
    m = this.months[month];
    d = d||1;
    return {y, m, d, h, mm, month};
  }

}

//
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  var week1 = new Date(date.getFullYear(), 0, 4);
  var ret = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
         - 3 + (week1.getDay() + 6) % 7) / 7);
  return ret;
}
