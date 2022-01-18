



## v0.7.4 (2022-01-18)

#### :bug: Bug Fix
* [#608](https://github.com/kaliber5/ecsy-babylon/pull/608) Add missing `indexOfRefraction` property to `PbrMaterial` ([@simonihmig](https://github.com/simonihmig))
* [#606](https://github.com/kaliber5/ecsy-babylon/pull/606) Add missing color properties to lights ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v0.7.3 (2021-12-08)

#### :bug: Bug Fix
* [#599](https://github.com/kaliber5/ecsy-babylon/pull/599) Ensure we always explicitly pass `Scene` when creating new objects ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v0.7.2 (2021-12-07)

#### :bug: Bug Fix
* [#598](https://github.com/kaliber5/ecsy-babylon/pull/598) Mesh systems adds meshes recursively including children ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v0.7.1 (2021-11-26)

#### :bug: Bug Fix
* [#595](https://github.com/kaliber5/ecsy-babylon/pull/595) Fix `No instance component found` when entity w/ post-processing is removed ([@simonihmig](https://github.com/simonihmig))

#### :house: Internal
* [#597](https://github.com/kaliber5/ecsy-babylon/pull/597) Update ESLint & Co ([@simonihmig](https://github.com/simonihmig))
* [#596](https://github.com/kaliber5/ecsy-babylon/pull/596) Fix flaky transition test ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v0.7.0 (2021-06-21)

#### :boom: Breaking Change
* [#530](https://github.com/kaliber5/ecsy-babylon/pull/530) Drop node 10 support ([@simonihmig](https://github.com/simonihmig))
* [#529](https://github.com/kaliber5/ecsy-babylon/pull/529) Drop own resize handling ([@simonihmig](https://github.com/simonihmig))

#### :rocket: Enhancement
* [#529](https://github.com/kaliber5/ecsy-babylon/pull/529) Drop own resize handling ([@simonihmig](https://github.com/simonihmig))

#### Committers: 2
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v0.6.5 (2021-04-20)

#### :rocket: Enhancement
* [#479](https://github.com/kaliber5/ecsy-babylon/pull/479) Add `pivot-point` component ([@simonihmig](https://github.com/simonihmig))

#### Committers: 2
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v0.6.4 (2021-03-22)

#### :bug: Bug Fix
* [#454](https://github.com/kaliber5/ecsy-babylon/pull/454) Add missing `alpha` property to PbrMaterial component ([@simonihmig](https://github.com/simonihmig))

#### :memo: Documentation
* [#390](https://github.com/kaliber5/ecsy-babylon/pull/390) Added Readme and example implementation. ([@mrchantey](https://github.com/mrchantey))

#### Committers: 3
- Peter Hayman ([@mrchantey](https://github.com/mrchantey))
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v0.6.3 (2020-12-11)

#### :rocket: Enhancement
* [#364](https://github.com/kaliber5/ecsy-babylon/pull/364) Add basic WebXR support using Babylon's WebXRDefaultExperience ([@simonihmig](https://github.com/simonihmig))

#### Committers: 2
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v0.6.2 (2020-11-27)

#### :rocket: Enhancement
* [#348](https://github.com/kaliber5/ecsy-babylon/pull/348) Update Babylon.js to 4.2 ([@simonihmig](https://github.com/simonihmig))

#### :bug: Bug Fix
* [#299](https://github.com/kaliber5/ecsy-babylon/pull/299) Fix animation support when tree shaking ([@simonihmig](https://github.com/simonihmig))

#### Committers: 2
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v0.6.1 (2020-10-08)

#### :rocket: Enhancement
* [#298](https://github.com/kaliber5/ecsy-babylon/pull/298) Make frame rate optional for transitions ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v0.6.0 (2020-10-08)

#### :boom: Breaking Change
* [#297](https://github.com/kaliber5/ecsy-babylon/pull/297) Revert rotation unit back from degrees to radians ([@simonihmig](https://github.com/simonihmig))
* [#295](https://github.com/kaliber5/ecsy-babylon/pull/295) Add support for Transitions ([@simonihmig](https://github.com/simonihmig))

#### :rocket: Enhancement
* [#297](https://github.com/kaliber5/ecsy-babylon/pull/297) Revert rotation unit back from degrees to radians ([@simonihmig](https://github.com/simonihmig))
* [#295](https://github.com/kaliber5/ecsy-babylon/pull/295) Add support for Transitions ([@simonihmig](https://github.com/simonihmig))

#### :bug: Bug Fix
* [#289](https://github.com/kaliber5/ecsy-babylon/pull/289) Fix leaking of Vector3 instances in transformNode, causing wrong values after component removal, add tests ([@simonihmig](https://github.com/simonihmig))

#### Committers: 2
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v0.5.0 (2020-09-21)

#### :boom: Breaking Change
* [#276](https://github.com/kaliber5/ecsy-babylon/pull/276) Don't add default camera to scene ([@simonihmig](https://github.com/simonihmig))

#### :rocket: Enhancement
* [#276](https://github.com/kaliber5/ecsy-babylon/pull/276) Don't add default camera to scene ([@simonihmig](https://github.com/simonihmig))

#### :bug: Bug Fix
* [#275](https://github.com/kaliber5/ecsy-babylon/pull/275) Fix actions not working when ray support has not been enabled due to tree-shaking ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v0.4.2 (2020-09-16)

#### :bug: Bug Fix
* [#274](https://github.com/kaliber5/ecsy-babylon/pull/274) Fix missing samples property in DefaultRenderingPipeline ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v0.4.1 (2020-09-16)

#### :rocket: Enhancement
* [#273](https://github.com/kaliber5/ecsy-babylon/pull/273) Extend StandardMaterial properties ([@simonihmig](https://github.com/simonihmig))

#### :bug: Bug Fix
* [#265](https://github.com/kaliber5/ecsy-babylon/pull/265) Fix setting initial target for TargetCamera ([@simonihmig](https://github.com/simonihmig))

#### Committers: 2
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v0.4.0 (2020-09-11)

#### :boom: Breaking Change
* [#264](https://github.com/kaliber5/ecsy-babylon/pull/264) Fix types of instance components ([@simonihmig](https://github.com/simonihmig))
* [#239](https://github.com/kaliber5/ecsy-babylon/pull/239) Refactor to use new FactorySystems ([@simonihmig](https://github.com/simonihmig))

#### :rocket: Enhancement
* [#263](https://github.com/kaliber5/ecsy-babylon/pull/263) Add basic TargetCamera ([@simonihmig](https://github.com/simonihmig))
* [#242](https://github.com/kaliber5/ecsy-babylon/pull/242) Add PostProcess pipelines support, including Default and SSAO pipelines ([@simonihmig](https://github.com/simonihmig))
* [#241](https://github.com/kaliber5/ecsy-babylon/pull/241) Add motion-blur post process ([@simonihmig](https://github.com/simonihmig))
* [#240](https://github.com/kaliber5/ecsy-babylon/pull/240) Add spot lights ([@simonihmig](https://github.com/simonihmig))
* [#239](https://github.com/kaliber5/ecsy-babylon/pull/239) Refactor to use new FactorySystems ([@simonihmig](https://github.com/simonihmig))
* [#238](https://github.com/kaliber5/ecsy-babylon/pull/238) Add black-and-white post-process ([@simonihmig](https://github.com/simonihmig))
* [#237](https://github.com/kaliber5/ecsy-babylon/pull/237) Add blur post-process ([@simonihmig](https://github.com/simonihmig))
* [#236](https://github.com/kaliber5/ecsy-babylon/pull/236) Add initial Postprocesses support ([@simonihmig](https://github.com/simonihmig))
* [#235](https://github.com/kaliber5/ecsy-babylon/pull/235) Refactor camera system to use camera instance component ([@simonihmig](https://github.com/simonihmig))
* [#234](https://github.com/kaliber5/ecsy-babylon/pull/234) Introduce InstanceComponent ([@simonihmig](https://github.com/simonihmig))

#### :bug: Bug Fix
* [#264](https://github.com/kaliber5/ecsy-babylon/pull/264) Fix types of instance components ([@simonihmig](https://github.com/simonihmig))
* [#233](https://github.com/kaliber5/ecsy-babylon/pull/233) Fix demos ([@simonihmig](https://github.com/simonihmig))

#### Committers: 2
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v0.3.0 (2020-08-25)

## v0.3.0-2 (2020-08-25)

#### :rocket: Enhancement
* [#231](https://github.com/kaliber5/ecsy-babylon/pull/231) Fix shadow system, add update support, add tests ([@simonihmig](https://github.com/simonihmig))
* [#230](https://github.com/kaliber5/ecsy-babylon/pull/230) Add missing shadowmap generator component properties ([@simonihmig](https://github.com/simonihmig))
* [#229](https://github.com/kaliber5/ecsy-babylon/pull/229) Add missing light component properties ([@simonihmig](https://github.com/simonihmig))

#### :bug: Bug Fix
* [#232](https://github.com/kaliber5/ecsy-babylon/pull/232) Use custom assign helper to ignore undefined values ([@simonihmig](https://github.com/simonihmig))
* [#231](https://github.com/kaliber5/ecsy-babylon/pull/231) Fix shadow system, add update support, add tests ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v0.3.0-1 (2020-08-25)

#### :boom: Breaking Change
* [#227](https://github.com/kaliber5/ecsy-babylon/pull/227) Fix exported name of PbrMaterial ([@simonihmig](https://github.com/simonihmig))

#### :bug: Bug Fix
* [#228](https://github.com/kaliber5/ecsy-babylon/pull/228) Export array of systems explicitly ([@simonihmig](https://github.com/simonihmig))
* [#227](https://github.com/kaliber5/ecsy-babylon/pull/227) Fix exported name of PbrMaterial ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v0.3.0-0 (2020-08-25)

#### :boom: Breaking Change
* [#226](https://github.com/kaliber5/ecsy-babylon/pull/226) Restructure module exports ([@simonihmig](https://github.com/simonihmig))

#### Committers: 2
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v0.2.0 (2020-08-21)

#### :boom: Breaking Change
* [#217](https://github.com/kaliber5/ecsy-babylon/pull/217) Update to ECSY 0.4 ([@simonihmig](https://github.com/simonihmig))
* [#216](https://github.com/kaliber5/ecsy-babylon/pull/216) Update to ECSY 0.3 ([@simonihmig](https://github.com/simonihmig))

#### :rocket: Enhancement
* [#217](https://github.com/kaliber5/ecsy-babylon/pull/217) Update to ECSY 0.4 ([@simonihmig](https://github.com/simonihmig))
* [#216](https://github.com/kaliber5/ecsy-babylon/pull/216) Update to ECSY 0.3 ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))


## v0.1.11 (2020-08-19)

#### :rocket: Enhancement
* [#215](https://github.com/kaliber5/ecsy-babylon/pull/215) Allow overrides of mesh ([@simonihmig](https://github.com/simonihmig))
* [#214](https://github.com/kaliber5/ecsy-babylon/pull/214) Allow overrides of material ([@simonihmig](https://github.com/simonihmig))

#### Committers: 1
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))

## v0.1.10 (2020-08-18)

#### :bug: Bug Fix
* [#212](https://github.com/kaliber5/ecsy-babylon/pull/212) Allow mesh to be reused by another entity ([@simonihmig](https://github.com/simonihmig))

#### :house: Internal
* [#213](https://github.com/kaliber5/ecsy-babylon/pull/213) Fix flakey babylon system test ([@simonihmig](https://github.com/simonihmig))
* [#211](https://github.com/kaliber5/ecsy-babylon/pull/211) Drop semantic-release, setup release-it ([@simonihmig](https://github.com/simonihmig))

#### Committers: 2
- Simon Ihmig ([@simonihmig](https://github.com/simonihmig))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v0.1.9 (2020-05-25)

#### Features
* light: support light updates ([@simonihmig](https://github.com/simonihmig))
* add lines support ([@simonihmig](https://github.com/simonihmig))

#### Bug Fixes
* fix reset() of pbr-material component ([@simonihmig](https://github.com/simonihmig))
