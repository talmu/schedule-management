import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import formatISO from "date-fns/formatISO";
import SelectedField from "./SelectedField";
import AddField from "./AddField";
import * as R from "ramda";
import FieldSelect from "./FieldSelect";
import OperatorSelect from "./OperatorSelect";
import FilterValues from "./FilterValues";

const FieldFilterOptions = ({ options, setOptions, clicked }) => {
  const [field, setField] = useState(options[0]);
  const [operator, setOperator] = useState(0);
  const [value, setValue] = useState(defaultValues[field]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setValue(defaultValues[field]);
  }, [field]);

  const error =
    R.equals(field, "Status") || R.equals(field, "Priority")
      ? value.length === 0
      : false;

  const handleValue = (newValue) => setValue(newValue);
  const handleField = (newValue) => setField(newValue);
  const handleOperator = (newValue) => setOperator(newValue);
  const handleFilter = (newValue) => setFilters(newValue);

  return (
    <div>
      {clicked ? (
        options.length !== 0 ? (
          <Grid container spacing={1}>
            <FieldSelect
              field={field}
              setField={handleField}
              options={options}
            />
            <OperatorSelect
              operator={operator}
              setOperator={handleOperator}
              field={field}
            />
            <SelectedField
              value={value}
              setValue={handleValue}
              error={error}
              field={field}
            />
            <AddField
              field={field}
              setField={handleField}
              filters={filters}
              setFilters={handleFilter}
              value={value}
              operator={operator}
              options={options}
              setOptions={setOptions}
              error={error}
            />
          </Grid>
        ) : (
          <Typography style={{ fontWeight: "bold" }}>
            No more fields to filter
          </Typography>
        )
      ) : null}
      <FilterValues
        filters={filters}
        setFilters={handleFilter}
        options={options}
        setOptions={setOptions}
        setField={handleField}
      />
    </div>
  );
};

const defaultValues = {
  Status: [],
  Priority: [],
  Scheduled: formatISO(new Date(), { representation: "date" }),
  Due: formatISO(new Date()).slice(0, 16),
};

export const operators = {
  Status: ["=", "!="],
  Priority: ["=", "!="],
  Scheduled: ["=", "!=", "<", ">", "<=", ">="],
  Due: ["=", "!=", "<", ">", "<=", ">="],
};

export default FieldFilterOptions;
