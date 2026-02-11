# Design Decisions

Why these resources specifically:
Tasks are the main data, lists organize tasks, and users represent ownership.

PUT vs PATCH:
PUT replaces a full resource. PATCH is used for tasks because updates are usually small changes like completed status.

How API avoids breaking clients:
Changes are additive only. New fields can be added without removing or changing existing ones.

Tradeoff:
Used simple page/limit pagination instead of cursor pagination because it is easier.
