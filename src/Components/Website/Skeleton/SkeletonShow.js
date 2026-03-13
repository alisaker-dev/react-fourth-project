import Skeleton from "react-loading-skeleton";
export default function SkeletonShow(props) {
  const skeletonLength = Array.from({ length: props.length }).map(
    (item, key) => (
      <div key={key} className={`col-lg-3 col-md-6 col-12 ${props.classes}`}>
        <div className="mx-1">
          <Skeleton width={props.width} height={props.height} />
        </div>
      </div>
    ),
  );
  return skeletonLength;
}
