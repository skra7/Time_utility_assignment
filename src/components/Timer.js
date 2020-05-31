import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/container";
import Time from "react-time";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  rightComponent: {
    right: "right",
  },
}));

export default function Timer() {
  const classes = useStyles();
  const [varstate, setvarstate] = React.useState({
    now: new Date(),
    interval: null,
    utcDate: new Date(new Date().toUTCString().slice(0, -4)),
  });

  const [timeSeconds, setTimeSeconds] = React.useState(0);

  const [convertDate, setConvertDate] = React.useState({
    year: 0,
    month: 0,
    date: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });

  const [localTimeStamp, setlocalTimeStamp] = React.useState("");
  const [utcTimeStamp, setutcTimeStamp] = React.useState("");
  const [secondsConversion, setsecondsConversion] = React.useState("");

  React.useEffect(() => {
    varstate.interval = setInterval(function () {
      setvarstate({
        now: new Date(),
        utcDate: new Date(new Date().toUTCString().slice(0, -4)),
      });
    }, 1000);
  });

  // eslint-disable-next-line no-extend-native
  Date.prototype.addSeconds = function (seconds) {
    this.setSeconds(this.getSeconds() + seconds);
  };

  // eslint-disable-next-line no-extend-native
  Date.prototype.addMinutes = function (minutes) {
    this.setMinutes(this.getMinutes() - minutes);
  };

  const handleVarChange = (event) => {
    setTimeSeconds(event.target.value);
    console.log("######!!!!", timeSeconds);
    var date = new Date(1970, 0, 1);
    var offset = new Date().getTimezoneOffset();
    date.addSeconds(event.target.value);
    var localDate = new Date(1970, 0, 1);
    localDate.addSeconds(event.target.value);
    console.log(offset);
    localDate.addMinutes(offset);
    setlocalTimeStamp(localDate.toLocaleString());
    setutcTimeStamp(date.toLocaleString());
  };

  const handleConvertDate = (name) => (event) => {
    var dateValue = null;
    const offset = new Date().getTimezoneOffset();
    if (event.target.value !== "" || !event.target.value) {
      setConvertDate({ ...convertDate, [name]: event.target.value });
    } else {
      setConvertDate({ ...convertDate, [name]: 0 });
    }
    switch (name) {
      case "year":
        dateValue = new Date(
          Date.UTC(
            event.target.value,
            convertDate.month - 1,
            convertDate.date,
            convertDate.hour,
            convertDate.minute,
            convertDate.second
          )
        );
        break;
      case "month":
        dateValue = new Date(
          Date.UTC(
            convertDate.year,
            event.target.value - 1,
            convertDate.date,
            convertDate.hour,
            convertDate.minute,
            convertDate.second
          )
        );
        break;
      case "date":
        dateValue = new Date(
          Date.UTC(
            convertDate.year,
            convertDate.month - 1,
            event.target.value,
            convertDate.hour,
            convertDate.minute,
            convertDate.second
          )
        );
        break;
      case "hour":
        dateValue = new Date(
          Date.UTC(
            convertDate.year,
            convertDate.month - 1,
            convertDate.date,
            event.target.value,
            convertDate.minute,
            convertDate.second
          )
        );
        break;
      case "minute":
        dateValue = new Date(
          Date.UTC(
            convertDate.year,
            convertDate.month - 1,
            convertDate.date,
            convertDate.hour,
            event.target.value,
            convertDate.second
          )
        );
        break;
      case "second":
        dateValue = new Date(
          Date.UTC(
            convertDate.year,
            convertDate.month - 1,
            convertDate.date,
            convertDate.hour,
            convertDate.minute,
            event.target.value
          )
        );
        break;
      default:
        console.log("Default");
    }

    console.log(dateValue);
    setsecondsConversion(dateValue.getTime() / 1000 + offset * 60);
  };

  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <InputLabel disabled id="demo-simple-select-label">
            UTC Date
          </InputLabel>
          <br />
          <h4>
            <Time value={varstate.utcDate} format="DD/MM/YYYY" />
          </h4>
        </Grid>
        <Grid className={classes.rightComponent} item xs={12} md={6}>
          <InputLabel disabled id="demo-simple-select-label">
            Local Date
          </InputLabel>
          <br />
          <h4>
            <Time value={varstate.now} format="DD/MM/YYYY" />
          </h4>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel disabled id="demo-simple-select-label">
            UTC Time
          </InputLabel>
          <br />
          <h4>
            <Time value={varstate.utcDate} format="HH:mm:ss" />
          </h4>
        </Grid>
        <Grid className={classes.rightComponent} item xs={12} md={6}>
          <InputLabel disabled id="demo-simple-select-label">
            Local Time
          </InputLabel>
          <br />
          <h4>
            <Time value={varstate.now} format="HH:mm:ss" />
          </h4>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel disabled id="demo-simple-select-label">
            UNIX Time
          </InputLabel>
          <br />
          <Box fontWeight={700} disabled id="demo-simple-select-label">
            {Math.floor(varstate.utcDate.getTime() / 1000)}
          </Box>
        </Grid>
        <Grid className={classes.rightComponent} item xs={12} md={6}>
          <InputLabel disabled id="demo-simple-select-label">
            Local Timezone (
            {varstate.now
              .toTimeString()
              .slice(9)
              .substring(
                0,
                varstate.now.toTimeString().slice(9).indexOf("(") - 1
              )}
            )
          </InputLabel>
          <br />
          <Box fontWeight={700} disabled id="demo-simple-select-label">
            {varstate.now
              .toTimeString()
              .slice(9)
              .substring(
                varstate.now.toTimeString().slice(9).indexOf("(") + 1,
                varstate.now.toTimeString().slice(9).indexOf(")")
              )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="timeSeconds"
            value={timeSeconds === 0 ? "" : timeSeconds}
            onChange={handleVarChange}
            label="Convert Seconds"
            variant="outlined"
          />
        </Grid>
        <Grid className={classes.rightComponent} item xs={12} md={6}>
          <TextField
            id="YYYY"
            value={convertDate.year === 0 ? "" : convertDate.year}
            onChange={handleConvertDate("year")}
            label="YYYY"
            style={{ float: "left", width: "33%" }}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="MM"
            value={convertDate.month === 0 ? "" : convertDate.month}
            onChange={handleConvertDate("month")}
            label="MM"
            style={{ width: "33%" }}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="DD"
            value={convertDate.date === 0 ? "" : convertDate.date}
            onChange={handleConvertDate("date")}
            label="DD"
            style={{ float: "right", width: "33%" }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="localTime"
            value={localTimeStamp}
            label="to Local Time & date"
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid className={classes.rightComponent} item xs={12} md={6}>
          <TextField
            id="HH"
            value={convertDate.hour === 0 ? "" : convertDate.hour}
            onChange={handleConvertDate("hour")}
            label="HH"
            style={{ float: "left", width: "33%" }}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="Minutes"
            value={convertDate.minute === 0 ? "" : convertDate.minute}
            onChange={handleConvertDate("minute")}
            label="MM"
            style={{ width: "33%" }}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="SS"
            value={convertDate.second === 0 ? "" : convertDate.second}
            onChange={handleConvertDate("second")}
            label="SS"
            style={{ float: "right", width: "33%" }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="utcTime"
            value={utcTimeStamp}
            label="to UTC Time & date"
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid className={classes.rightComponent} item xs={12} md={6}>
          <TextField
            id="toSeconds"
            value={secondsConversion}
            label="To Seconds since epoch"
            variant="outlined"
            disabled
            fullWidth
          />
        </Grid>
      </Grid>
    </Container>
  );
}
