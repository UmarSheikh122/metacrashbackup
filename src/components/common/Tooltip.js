import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import tooltip from '../../assets/images/tooltip.svg';

function Tooltip() {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="button-tooltip-2">Check out this avatar</Tooltip>}
    >
      {({ ref, ...triggerHandler }) => (
        <Button
          variant=""
          {...triggerHandler}
          className="d-inline-flex align-items-center"
        >
          <Image
            ref={ref}
            roundedCircle
            src={tooltip}
          />
        </Button>
      )}
    </OverlayTrigger>
  );
}

export default Tooltip;