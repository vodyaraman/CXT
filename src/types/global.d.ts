import { ThreeElements } from '@react-three/fiber'
import "./storage.types";

declare global {
  namespace React {
    namespace JSX {
        interface IntrinsicElements extends ThreeElements {
        }
    }
  }
}

export {};