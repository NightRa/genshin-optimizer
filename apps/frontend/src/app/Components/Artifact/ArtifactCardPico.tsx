import { allElementsWithPhy, SlotKey } from '@genshin-optimizer/consts';
import { artifactAsset } from '@genshin-optimizer/g-assets';
import { Box, Typography } from '@mui/material';
import Assets from '../../Assets/Assets';
import Artifact from '../../Data/Artifacts/Artifact';
import StatIcon from '../../KeyMap/StatIcon';
import { ICachedArtifact } from '../../Types/artifact';
import CardDark from '../Card/CardDark';
import SqBadge from '../SqBadge';
import ArtifactTooltip from './ArtifactTooltip';

export default function ArtifactCardPico({ artifactObj: art, slotKey: key }: { artifactObj: ICachedArtifact | undefined, slotKey: SlotKey }) {
  // Blank artifact slot icon
  if (!art)
    return <CardDark sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ width: "100%", pb: "100%", position: "relative", }}>
        <Box
          sx={{
            position: "absolute",
            width: "70%", height: "70%",
            left: "50%", top: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.7
          }}
          component="img"
          src={Assets.slot[key]}
        />
      </Box>
    </CardDark>

  // Actual artifact icon + info
  const { mainStatKey, rarity, level } = art
  const element = allElementsWithPhy.find(ele => art.mainStatKey.includes(ele))
  const color = element ?? "secondary"

  return <ArtifactTooltip art={art}><CardDark sx={{ display: "flex", flexDirection: "column", position: "relative" }}>
    <Box
      component="img"
      className={`grad-${rarity}star`}
      src={artifactAsset(art.setKey, art.slotKey)}
      maxWidth="100%"
      maxHeight="100%"
    />
    <Typography sx={{ position: "absolute", fontSize: "0.75rem", lineHeight: 1, opacity: 0.85, pointerEvents: "none", }}>
      <strong><SqBadge sx={{ p: 0.5 }} color={Artifact.levelVariant(level)}><strong>+{level}</strong></SqBadge></strong>
    </Typography>
    <Typography sx={{ position: "absolute", fontSize: "0.75rem", lineHeight: 1, opacity: 0.85, pointerEvents: "none", bottom: 0, right: 0 }}>
      <SqBadge color={color} sx={{ p: 0.5 }}><StatIcon statKey={mainStatKey} iconProps={{ fontSize: "inherit" }} /></SqBadge>
    </Typography>
  </CardDark></ArtifactTooltip>
}
