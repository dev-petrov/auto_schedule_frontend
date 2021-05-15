<template>
  <b-table sort-by='ordering' :items="constraints" :fields="fields">
    <template #cell(up)="row">
      <b-button
        class="btn btn-primary"
        @click="changeOrder(row.item, -1);"
        v-if='row.item.ordering != 999 && row.item.ordering != min_order'
      >
        ▲
      </b-button>
    </template>
    <template #cell(down)="row">
      <b-button
        class="btn btn-primary"
        @click="changeOrder(row.item, 1);"
        v-if='row.item.ordering != 999 && row.item.ordering != max_order'
      >
        ▼
      </b-button>
    </template>
    <template #cell(addremove)="row">
      <b-button
        :class="`btn ${row.item.ordering == 999 ? 'btn-success' : 'btn-danger'}`"
        @click="row.item.ordering == 999 ? addBuilding(row.item) : removeBuilding(row.item);"
      >
        {{row.item.ordering == 999 ? 'Добавить' : 'Удалить'}}
      </b-button>
    </template>
  </b-table>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      content: this.value,
      fields: [
        {
          key: "name",
          label: "Название",
        },
        {
          key: "up",
          label: "",
        },
        {
          key: "down",
          label: "",
        },
        {
          key: "addremove",
          label: "",
        },
      ],
    };
  },
  computed: {
    constraints() {
      var constraints = [];
      for (let build of this.$store.state.buildings) {
        let val = this.content[
          this.content.findIndex((v) => v.building_id == build.id)
        ];
        let data = {
          name: build.name,
          ordering: val ? val.ordering : 999,
          building_id: build.id,
        };
        constraints.push(data);
      }
      return constraints;
    },
    max_order() {
      return Math.max(
        ...this.content.filter((v) => v.ordering < 999).map((v) => v.ordering)
      );
    },
    min_order() {
      return Math.min(...this.content.map((v) => v.ordering));
    },
  },
  methods: {
    updateObject(building_id, remove, order, prev_order = -1) {
      let index = this.content.findIndex((v) => v.building_id == building_id);
      if (prev_order != -1) {
        let ind = this.content.findIndex((v) => v.ordering == order)
        let val = this.content[ind]
        val.ordering = prev_order;
        this.$set(this.content, ind, val);
      }
      if (index != -1) {
        let val = this.content[index];
        val.remove = remove;
        val.ordering = order;
        this.$set(this.content, index, val);
      } else {
        let val = {
          building_id: building_id,
          remove: remove,
          ordering: order,
        };
        this.content.push(val);
      }
      this.content = this.content.sort((a, b) => a.ordering - b.ordering);
      let last_index = 0;
      for (let el of this.content) {
        if (!el.remove) {
          el.ordering = last_index;
          last_index += 1;
        }
      }
      this.$emit(
        "input",
        this.content.filter((v) => v.id || !v.remove)
      );
    },
    addBuilding(obj) {
      this.updateObject(obj.building_id, false, 999);
    },
    removeBuilding(obj) {
      this.updateObject(obj.building_id, true, 999);
    },
    changeOrder(obj, order) {
      this.updateObject(obj.building_id, false, obj.ordering + order, obj.ordering);
    },
  },
};
</script>

<style>
</style>