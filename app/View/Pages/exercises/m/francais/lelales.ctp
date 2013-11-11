<?php
echo $this->Html->script('bootstrap_alert');
echo $this->Html->script('exercises/Engine');
echo $this->Html->script('exercises/Score');
echo $this->Html->script('exercises/m/Level');
echo $this->Html->script('exercises/m/francais/Subject');
echo $this->Html->script('exercises/m/francais/lelales/Topic');
echo $this->Html->script('exercises/m/francais/lelales/Controller');
echo $this->Html->script('exercises/m/francais/lelales/Model');
echo $this->Html->script('exercises/m/francais/lelales/Module');
echo $this->Html->script('exercises/m/francais/lelales/View');
?>

<script language="javascript">
    $(document).ready(function () {
        var e = new engine('exercises/m/exercise-m');
        var module = new m.francais.lelales.Module(e);

        e.init(module);
    });
</script>

<div class="container" id="exercise-view">
</div>
<div id="alert_placeholder" style="position:absolute; top:50%; left:50%;"></div>