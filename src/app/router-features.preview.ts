import { RouterFeatures, withHashLocation } from '@angular/router';

/** Used by `ng build --configuration preview`, for hosts that can't rewrite paths to index.html. */
export const ROUTER_FEATURES: RouterFeatures[] = [withHashLocation()];
