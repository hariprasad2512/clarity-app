import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faApple,
  faWindows,
  faAndroid,
  faGithub,
  faLinux,
  type IconDefinition,
} from "@fortawesome/free-brands-svg-icons"
import { faTerminal } from "@fortawesome/free-solid-svg-icons"

export {
  faApple,
  faWindows,
  faAndroid,
  faGithub,
  faLinux,
  faTerminal,
}

export type FaIconDef = IconDefinition

export function FaIcon({
  icon,
  className = "size-5",
}: {
  icon: FaIconDef
  className?: string
}) {
  return <FontAwesomeIcon icon={icon} className={className} />
}
