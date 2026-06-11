# Pet 3D models

Active model mapping:

```
dog_01.glb      dog / Shiba Inu, wolf-style rig, forward +Z
dog_02.glb      dog / Husky, wolf-style rig, forward +Z
dog.glb         dog / Rescue Mix, newer rig, forward -Z
cat_02.glb      dog / Wolf, filename is legacy from the source asset, forward +Z
cat.glb         cat / Tabby, skinned mesh, no embedded animation clips, forward +Z
bird_01.glb     bird
chichen.glb     chicken, skinned mesh, no embedded animation clips, forward -Z
```

The old fox-like `cat_01.glb` asset was removed and should not be assigned to
cats. Filenames are matched in `src/lib/petModelConfig.ts`.
