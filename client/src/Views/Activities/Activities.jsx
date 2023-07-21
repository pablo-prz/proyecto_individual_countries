/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { connect } from "react-redux";
import ActivitiesContainer from "../../Components/ActivitiesContainer/ActivitiesContainer";

const Activities = ({ activities }) => {
  return (
    <div>
      <ActivitiesContainer activities={activities} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  activities: state.activities,
});

export default connect(mapStateToProps)(Activities);
